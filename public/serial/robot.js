/**
 * Created by Pais on 27.03.2015.
 */

var SerialFactory = require("serialport");
var SerialPort = require("serialport").SerialPort;
var debug = require("debug")("robot");

var portName = "";
var serialport;

exports.findPorts = function (res) {

    SerialFactory.list(function (err, list) {

        if (err) {
            // TODO: Fix response message
            res.send("error: " + err);
        };

        var ports = [];
        // Take only 'name' property of result
        for (var i = 0; i < list.length; i++) {
            // TODO: selection by manufacturer?
            ports.push({name: list[i].comName});
        };

        res.send(JSON.stringify(ports));
    });

};

exports.setPort = function (name) {
    portName = name;

    // Destroy previous instance of serailport
    if (serialport) {
        serialport.close(function (err) {
            // Logging
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
//TODO: Disconnection processing
//TODO: Check serialport variable defined
//TODO: Logging

// Response from router. Will be handled until all data from robot received.
var result;

var dataBuffer = {
    data: "",
    lastByte: "\x00", //Default value
    resetData: function () {
        this.data = "";
    }
};

exports.openConn = function (res) {

    if (!serialport) {
        // TODO: Fix message to send
        res.send("No serial port selected.");
        return;
    };

    if (serialport.isOpen()) {
        //TODO: Fix message to send
        res.send("Already opened");
        return;
    }
    ;

    // Arduino need some time to think about... something important, i suppose.
    setTimeout(
        serialport.open(function (err) {
            debug("open");
            console.log("open: " + err);

            serialport.on("open", function (err) {

                // Logging
                console.log("serialport.open emitted. Error: " + err);
                // TODO: some response to client
            });

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

            serialport.on("data", onDataCallback);

            serialport.on('disconnect', onDisconnectedCallback);

            if (err) {
                res.send(err);
            } else {
                //TODO: response message
                res.send("OK");
            }
            ;

        }), 500);
};

function onDataCallback(data) {

    //TODO: Set request timeout
    debug("received: " + data);
    dataBuffer.data += data.toString("hex");

    //TODO: Find another method to check whether transaction completed
    // 14 received bytes (14*2 numbers in hex) means end of transaction of data from robot.
    if (dataBuffer.data.length == 28 && result) {
        result.send(dataToJSON(dataBuffer.data));
        result = null;
        dataBuffer.resetData();
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

function onDisconnectedCallback(err) {

    console.log(err);

    this.emit('close', err);
}

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

    if (!serialport) {
        // TODO: Fix message to send
        res.send("No serial port selected.");
        return;
    };

    if (!serialport.isOpen()) {
        //TODO: Fix message to send
        res.send("Already closed");
        return;
    }
    ;

    serialport.close(function (err) {
        debug("close");
        console.log("close: " + err);

        if (err) {
            res.send(err);
        } else {
            //TODO: response message
            res.send("OK");
        }
        ;
    });
};

/*Direction constants*/
var FORWARD = "\xE0";
var BACK = "\x8F";
var RIGHT = "\xC0";
var LEFT = "\xA0";
var STOP = "\x00";

exports.move = function (direction, res) {

    if (!serialport) {
        // TODO: Fix message to send
        res.send("No serial port selected.");
        return;
    };

    if (!serialport.isOpen()) {
        //TODO: Fix message to send
        res.send("Port is not open");
        return;
    }
    ;

    result = res;

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

    serialport.write(new Buffer(directionByte, "binary"), function (err) {
        // Logging
        dataBuffer.lastByte = directionByte;
        serialport.drain(function (err) {
            //
        });
    });
};

exports.data = function (res) {

    if (!serialport) {
        // TODO: Fix message to send
        res.send("No serial port selected.");
        return;
    };

    if (!serialport.isOpen()) {
        //TODO: Fix message to send
        res.send("Port is not open");
        return;
    }
    ;

    result = res;

    serialport.write(new Buffer(dataBuffer.lastByte, "binary"), function (err) {
        // Logging
        serialport.drain(function (err) {
            //
        });
    });
};