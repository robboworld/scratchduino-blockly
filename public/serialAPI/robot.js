/**
 * Created by Pais on 27.03.2015.
 */

var SerialPort = require("serialport").SerialPort;
var debug = require("debug")("robot");

//TODO: How to detect an actual port?
var portName = "\\\\.\\COM3";
var dataBuffer = "";
var lastByte = "\x00";

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

serialport.on("data", function(data) {
    debug("recieved: " + data);
    dataBuffer += data;
    if (dataBuffer.length == 14) {
        console.log(dataBuffer);
        result.send(dataBuffer);
        dataBuffer = "";
    }
});

serialport.on("error", function(err) {
    //
});

exports.on = function() {
    //TODO: Pause after opening
    serialport.open(function(err) {
        debug("open");
        console.log("open");
    });
};

exports.off = function() {
    //TODO: Port do not open after closing
    serialport.close(function(err) {
        debug("close");
        console.log("close");
    })
};

/*Direction constants*/
var FORWARD = "\xE0";
var BACK = "\x8F";
var RIGHT = "\xC0";
var LEFT = "\xA0";
var STOP = "\x00";

exports.move = function(direction) {

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

    serialport.write(new Buffer(directionByte, "binary"), function(err, res) {
        //debug("write: " + directionByte);
        //console.log("write: " + directionByte);
        lastByte = directionByte;
    });
};

exports.data = function(res) {
    serialport.write(new Buffer(lastByte, "binary"));
    result = res;
    return dataBuffer;
};