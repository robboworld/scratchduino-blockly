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
            sendErrorResponse(res, 500, err, "Cannot get list of ports", ERR_SERIAL);
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
        sendErrorResponse(res, 500, "No serial port selected",
            "Please select a serial port", ERR_USER);
        return;
    };

    if (serialport.isOpen()) {
        sendErrorResponse(res, 500, "Port is already opened",
            "Attempt to open currently opened port", ERR_SERIAL);
        return;
    };

    serialport.open(function (err) {

        console.log("open: " + err);
        if (err) {
            sendErrorResponse(res, 500, err,
                "An error occurred while connecting to device", ERR_SERIAL);
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
            sendErrorResponse(response, 500, "Data output interrupted", "", ERR_SERIAL);
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
            sendErrorResponse(res, 500, err, "Port closed with error", ERR_SERIAL);
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

var savedDirection = null;

exports.setDirection = function (direction) {
    switch (direction) {
        case "1":
            savedDirection = BACK;
            break;
        case "2":
            savedDirection = LEFT;
            break;
        case "3":
            savedDirection = RIGHT;
            break;
        case "4":
            savedDirection = FORWARD;
            break;
        default:
            break;
    }
}

exports.engine = function (mode, res) {

    watchDisconnection(res);

    if (!checkPortAvailable(res)) return;

    var byteToSend;

    if (mode == "0" || savedDirection == null) {
        byteToSend = STOP;
    } else if (mode == "5") {
        byteToSend = savedDirection;
    } else {
        sendErrorResponse(res, 500, "Direction is not set", "Cannot send data to device", ERR_USER);
        return;
    };

    dataBuffer.lastByte = byteToSend;
    serialport.write(new Buffer(byteToSend, "binary"), function (err) {
        // Logging
        serialport.drain(function (err) {

            if (!res.headersSent) {
                if (err) {
                    sendErrorResponse(res, 500, err, "Cannot send data to device", ERR_SERIAL);
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
var DISCONNECTION_TIMEOUT = 5000;

function watchDisconnection(res, timeout) {

    setTimeout(function() {
        if (!res.headersSent) {
            sendErrorResponse(res, 500, "Disconnection", "Device disconnected", ERR_SERIAL);
            // TODO: handle serialport not open
            serialport.close(function () {
                //
            });
        }
    }, DISCONNECTION_TIMEOUT);

};

function checkPortAvailable(res) {
    if (!serialport) {
        sendErrorResponse(res, 500, "No serial port selected",
            "Please select a serial port", ERR_USER);
        return false;
    };

    if (!serialport.isOpen()) {
        sendErrorResponse(res, 500, "Port is not open",
            "", ERR_SERIAL);
        return false;
    };

    return true;
}


var ERR_SERIAL = "serialport";
var ERR_USER = "user";
function sendErrorResponse(response, status, tech, user, type) {

    var error = {
        tech: tech,
        user: user,
        type: type
    };
    response.status(status).json(error);
}