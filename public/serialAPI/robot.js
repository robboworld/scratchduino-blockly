/**
 * Created by Pais on 27.03.2015.
 */

var SerialPort = require("serialport").SerialPort;
var debug = require("debug")("robot");

//TODO: How to detect an actual port?
var portName = "\\\\.\\COM3";

var serialport = new SerialPort(portName, {
    baudrate: 9600,
    databits: 8,
    stopbits: 1
}, false);

serialport.on("open", function(err) {
    debug("open");
    console.log("open");
});

serialport.on("close", function(err) {
    debug("close");
    console.log("close");
})

serialport.on("data", function(data) {
    debug("recieved: " + data);
    console.log("recieved: " + data);
})

exports.on = function() {
    serialport.open(function(err) {
        //
    });
};

exports.off = function() {
    //TODO: Port do not open after closing
    serialport.close(function(err) {
        //
    })
};

/*Direction constants*/
var FORWARD = "\xe0";
var BACK = "\x80";
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
        //
        debug("write: " + directionByte);
        console.log("write: " + directionByte);
    });
};

exports.sensor = function(sensorNumber) {
    //
};