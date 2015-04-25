/**
 * Created by Pais on 27.03.2015.
 */

var SerialFactory = require("serialport");
var SerialPort = require("serialport").SerialPort;
var debug = require("debug")("robot");
// Response from router
var responseKeeper = require("./response_keeper");
var connectionWatcher = require("./connection_watcher");

var portName = "";
var serialport;

//process.on('uncaughtException', function (err) {
//    console.log('uncaught exception: ' + err);
//});

exports.findPorts = function(res) {

    responseKeeper.addResponse(res);

    SerialFactory.list(function (err, list) {

        if (err) {
            responseKeeper.send(err, 500);
        };

        var ports = [];
        // Take only 'name' property of result
        for (var i = 0; i < list.length; i++) {
            // TODO: selection by manufacturer?
            ports.push({name: list[i].comName});
        };
        try{
        responseKeeper.send(JSON.stringify(ports));} catch(err){}
    });

};

exports.setPort = function (name) {
    portName = name;

    // Destroy previous instance of serailport
    if (serialport && serialport.isOpen()) {
        serialport.close(function() {
            console.log("Previous connection closed");
        });
        delete serialport;
    }

    serialport = new SerialPort(portName, {
        baudrate: 38400,
        databits: 8,
        stopbits: 1
    }, false);
};

//TODO: Hardware button push
//TODO: Logging

var dataBuffer = {
    data: "",
    lastByte: "\x00", //Default value
    resetData: function () {
        this.data = "";
    }
};

exports.openConn = function (res) {

    responseKeeper.addResponse(res);

    if (!serialport) {
        responseKeeper.send("No serial port selected", 500);
        return;
    };

    if (serialport.isOpen()) {
        responseKeeper.send("Port is already opened", 200);
        return;
    };

    serialport.open(function (err) {

        console.log("open: " + err);

        if (err) {
            responseKeeper.send(err, 500);
            return;
        }

        serialport.on("close", function (err) {
            //May be called in disconnection callback
            // Logging
            console.log("serialport.close emitted. Error: " + err);
            // TODO: some response to client
        });

        serialport.on("error", function (err) {
            // Logging
            console.log("serialport.error emitted. Error: " + err);
            //TODO: some response to client
        });

        serialport.on('disconnect', function () {
            console.log('disconnected: ' + err);
        });

        serialport.on("data", onDataCallback);

        connectionWatcher.trigger = true;

        // Arduino need some time to think about... something important, i suppose.
        setTimeout(function () {
            responseKeeper.send(/*OK 200*/);
        }, 2000);
    });

    connectionWatcher.watchPortAvailable(responseKeeper);
};

function onDataCallback(data) {

    connectionWatcher.watchDisconnection(responseKeeper, serialport);

    dataBuffer.data += data.toString("hex");

    //TODO: Find another method to check whether transaction completed
    // 14 received bytes (14*2 numbers in hex) means end of transaction of data from robot.
    if (dataBuffer.data.length == 28) {
        if (dataBuffer.data.length == 28 && responseKeeper.isActivated()) {
            responseKeeper.send(dataToJSON(dataBuffer.data));
        }
        dataBuffer.resetData();
        connectionWatcher.trigger = true;
    }

};

function dataToJSON(data) {

    var json = {
        sensor_1: 0,
        sensor_2: 0,
        sensor_3: 0,
        sensor_4: 0,
        sensor_5: 0
    };

    var i = 8; //Sensor_0 first byte is expected to be on this index
    for (var val in json) {
        var high = parseInt(data.substr(i, 2), 16);
        var low = parseInt(data.substr(i + 2, 2), 16);

        // Get first byte of high
        high &= 0x01;
        // And append it as high byte of low
        low = (high << 7) | low;
        json[val] = low.toString();
        i += 4;
    }
    ;

    return JSON.stringify(json);
};

exports.pauseConn = function () {

    if (!serialport || !serialport.isOpen()) {
        return;
    };

    serialport.pause();
};

exports.resumeConn = function () {

    if (!serialport || !serialport.isOpen()) {
        return;
    };

    serialport.resume();
};

exports.closeConn = function (res) {

    responseKeeper.addResponse(res);

    if (!checkPortAvailable(responseKeeper)) return;

    serialport.close(function (err) {
        console.log("close callback: " + err);

        connectionWatcher.trigger = true;

        if (err) {
            responseKeeper.send(err, 500);
        } else {
            responseKeeper.send();
        }
        ;
    });

    connectionWatcher.watchPortAvailable(responseKeeper);
};

/*Direction constants*/
var FORWARD = "\xE0";
var BACK = "\x8F";
var RIGHT = "\xC0";
var LEFT = "\xA0";
var STOP = "\x00";

exports.move = function (direction, res) {

    responseKeeper.addResponse(res);

    if (!checkPortAvailable(responseKeeper)) return;

    var directionByte;
    switch (direction) {
        case "0":
            directionByte = STOP;
            break;
        case "1":
            directionByte = BACK;
            break;
        case "2":
            directionByte = LEFT;
            break;
        case "3":
            directionByte = RIGHT;
            break;
        case "4":
            directionByte = FORWARD;
            break;
        default:
            break;
    }

    dataBuffer.lastByte = directionByte;
    serialport.write(new Buffer(directionByte, "binary"), function (err) {
        // Logging
        serialport.drain(function (err) {
            //
        });
    });

    connectionWatcher.watchDisconnection(responseKeeper, serialport);
};

exports.data = function (res) {

    responseKeeper.addResponse(res);

    if (!checkPortAvailable(responseKeeper)) return;

    serialport.write(new Buffer(dataBuffer.lastByte, "binary"), function (err) {
        // Logging
        serialport.drain(function (err) {
            //
        });
    });

    connectionWatcher.watchDisconnection(responseKeeper, serialport);
};

function checkPortAvailable(resKeeper) {
    if (!serialport) {
        responseKeeper.send("No serial port selected", 500);
        return false;
    };

    if (!serialport.isOpen()) {
        responseKeeper.send("Port is not open", 500);
        return false;
    };

    return true;
}