/**
 * Created by Pais on 27.03.2015.
 */

var SerialPort = require("serialport").SerialPort;
var debug = require("debug")("robot");

//TODO: How to detect an actual port?
var portName = "\\\\.\\COM3";

//TODO: Debugging/Logging
//TODO: Disconnection processing (see SerialPort.prototype.disconnected)
//TODO: What to do with pause/resume on Win?

var dataBuffer = {
    data: "",
    lastByte: "\x00",
    resetData: function() {
        this.data = "";
    }
};

var result;

var serialport = new SerialPort(portName, {
    baudrate: 38400,
    databits: 8,
    stopbits: 1
}, false);

serialport.on("open", function(err) {
    //Will never be called
});

serialport.on("close", function(err) {
    //Will never be called
});

serialport.on("error", function(err) {
    //
});

serialport.on("data", function(data) {

    //TODO: Set request timeout
    debug("received: " + data);
    dataBuffer.data += data;
    console.log(data instanceof Buffer);
    console.log(data.toString("binary"));

    // 14 received bytes means end of transaction of data from robot.
    if (dataBuffer.data.length == 14 && result) {
        result.send(dataToJSON(dataBuffer.data));
        result = null;
        dataBuffer.resetData();
    }

});

function dataToJSON(data) {

    var json = {
        sensor_1: 0,
        sensor_2: 0,
        sensor_3: 0,
        sensor_4: 0,
        sensor_5: 0
    };

    var i = 5;
    for (var val in json) {
        //TODO: First bit for previous byte
        val = data.charCodeAt(i);
        //TODO: Chto za hernya?
        //console.log(data.charCodeAt(i).toString(2) + "  " + data.toString(2));
        i += 2;
    };

    return JSON.stringify(json);
};

exports.openConn = function(res) {
    if (serialport.isOpen()) {
        //TODO: Fix message to send
        res.send("Already opened");
        return;
    }

    //TODO: Pause after opening
    serialport.open(function(err) {
        debug("open");
        console.log("open: " + err);

        if (err) {
            res.send(err);
        } else {
            //TODO: response message
            res.send("OK");
        };
    });
};

exports.pauseConn = function() {
    serialport.pause();
};

exports.resumeConn = function() {
    serialport.resume();
};

exports.closeConn = function(res) {
    //Should only be called before end of session
    serialport.close(function(err) {
        debug("close");
        console.log("close: " + err);

        if (err) {
            res.send(err);
        } else {
            //TODO: response message
            res.send("OK");
        };
    });
};

/*Direction constants*/
var FORWARD = "\xE0";
var BACK = "\x8F";
var RIGHT = "\xC0";
var LEFT = "\xA0";
var STOP = "\x00";

exports.move = function(direction, res) {
    //TODO: Ignore if connection not opened
    result = res;

    var directionByte;
    switch(direction) {
        case "0": directionByte = STOP;
            break;
        case "1": directionByte = BACK;
            break;
        case "2": directionByte = LEFT;
            break;
        case "3": directionByte = RIGHT;
            break;
        case "4": directionByte = FORWARD;
            break;
        default:
            break;
    }

    serialport.write(new Buffer(directionByte, "binary"), function(err) {
        // Logging
        dataBuffer.lastByte = directionByte;
        serialport.drain(function(err) {

        });
    });
};

exports.data = function(res) {
    result = res;

    serialport.write(new Buffer(dataBuffer.lastByte, "binary"), function(err) {
        // Logging
        serialport.drain(function(err) {

        });
    });
};