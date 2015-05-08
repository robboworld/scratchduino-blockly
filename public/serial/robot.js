/**
 * Created by Pais on 27.03.2015.
 */

//TODO: Logging

var SerialFactory = require("serialport");
var SerialPort = require("serialport").SerialPort;

// Response object to send sensors data with
var response = null;

var portName = "";
var serialport;

//process.on('uncaughtException', function (err) {
//    console.log('uncaught exception: ' + err);
//});

exports.findPorts = function(res) {

    SerialFactory.list(function (err, list) {

        if (err) {
            res.status(500).send(err);
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

var dataBuffer = {
    data: "",
    lastByte: "\x00", //Default value
    resetData: function () {
        this.data = "";
    }
};

exports.openConn = function (res) {

    if (!serialport) {
        res.status(500).send("No serial port selected");
        return;
    };

    if (serialport.isOpen()) {
        res.status(500).send("Port is already opened");
        return;
    };

    serialport.open(function (err) {

        console.log("open: " + err);
        if (err) {
            res.status(500).send(err);
            return;
        }

        serialport.on("close", function (err) {
            console.log("serialport.close emitted. Error: " + err);
            // TODO: some response to client
        });

        serialport.on("error", function (err) {
            console.log("serialport.error emitted. Error: " + err);
            //TODO: some response to client
        });

        serialport.on("data", onDataCallback);

        // Arduino need some time to think about... something important, i suppose.
        setTimeout(function () {
            res.send("OK");
        }, 2000);
    });

};

function onDataCallback(data) {

    dataBuffer.data += data.toString("hex");

    if (response == null) {
        dataBuffer.resetData();
        return;
    };

    //TODO: Find another method to check whether transaction completed
    // 14 received bytes (14*2 numbers in hex) means end of transaction of data from robot.
    if (dataBuffer.data.length >= 28 && response != null) {
        if (!checkFirmware(dataBuffer.data)) {
            response.status(500).send("Data output interrupted");
        } else {
            response.send(dataToJSON(dataBuffer.data));
        }
        response = null;

        dataBuffer.resetData();
    };

};

var FIRM_HIGH = 248;
var FIRM_LOW = 4;
function checkFirmware(data) {

    var high = parseInt(data.substr(0, 2), 16);
    var low = parseInt(data.substr(2, 2), 16);

    if (high != FIRM_HIGH || low != FIRM_LOW) {
        return false;
    };
    return true;
}

function dataToJSON(data) {

    var json = {
        button: 0,
        sensor_1: 0,
        sensor_2: 0,
        sensor_3: 0,
        sensor_4: 0,
        sensor_5: 0
    };

    var i = 4; //First 4 bytes for firmware
    for (var val in json) {
        var high = parseInt(data.substr(i, 2), 16);
        var low = parseInt(data.substr(i + 2, 2), 16);

        // Get first byte of high
        high &= 0x07;
        // And append it as high byte of low
        low = (high << 7) | low;
        json[val] = low.toString();
        i += 4;
    }
    ;

    return JSON.stringify(json);
};

exports.closeConn = function (res) {

    if (!checkPortAvailable(res)) return;

    serialport.close(function (err) {
        console.log("close callback: " + err);

        if (err) {
            res.status(500).send(err);
        } else {
            res.send("OK");
        }
        ;
    });

    dataBuffer.resetData();
};

/*Direction constants*/
var FORWARD = "\xE0";
var BACK = "\x8F";
var RIGHT = "\xC0";
var LEFT = "\xA0";
var STOP = "\x00";

exports.move = function (direction, res) {

    watchDisconnection(res);

    if (!checkPortAvailable(res)) return;

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

            if (!res.headersSent) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send("OK");
                }
            }
        });

    });

};

exports.data = function(res) {

    watchDisconnection(res);
    response = res;

    if (!checkPortAvailable(res)) return;

    serialport.write(new Buffer(dataBuffer.lastByte, "binary"), function (err) {
        // Logging
    });

};

// TODO: Try to reconnect?
var DISCONNECTION_TIMEOUT = 1500;

function watchDisconnection(res, timeout) {

    setTimeout(function() {
        if (!res.headersSent) {
            res.status(500).send("Device disconnected");
        }
    }, DISCONNECTION_TIMEOUT);

};

function checkPortAvailable(res) {
    if (!serialport) {
        res.status(500).send("No serial port selected");
        return false;
    };

    if (!serialport.isOpen()) {
        res.status(500).send("Port is not open");
        return false;
    };

    return true;
}