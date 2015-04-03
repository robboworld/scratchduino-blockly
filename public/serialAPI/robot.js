/**
 * Created by Pais on 27.03.2015.
 */

var SerialPort = require("serialport").SerialPort;
var debug = require("debug")("robot");

//TODO: How to detect an actual port?
var portName = "\\\\.\\COM3";

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

serialport.on("data", function(data) {

    //TODO: Set request timeout
    debug("recieved: " + data);
    dataBuffer += data;

    if (dataBuffer.length == 14 && result) {
        //console.log(dataBuffer);
        result.send(dataToJSON(dataBuffer));
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
        val = data.charAt(i);
        i += 2;
    };

    return json.stringify();

};

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

exports.move = function(direction, res) {
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

    serialport.write(new Buffer(directionByte, "binary"), function(err, res) {
        lastByte = directionByte;
    });
};

exports.data = function(res) {
    result = res;

    serialport.write(new Buffer(lastByte, "binary"));
};