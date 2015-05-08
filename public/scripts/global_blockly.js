/**
 * Created by Pais on 08.05.2015.
 */


function global_blockly() {

};

global_blockly.SENSORS_REQUSET_TIMEOUT = 100;
global_blockly.BUTTON_THRESHOLD = 1020;

global_blockly.addedEvListeners = [];
global_blockly.stop_timeoutID = null;
global_blockly.direction = null;
global_blockly.timeout = null;
global_blockly.is_engine_ready = false;

global_blockly.createNewKeyListener = function(keyCode, action_func) {
    var listenerFunc = new Function("event",
        "if(event.keyCode == {0}) ({1})();\n".format(keyCode, action_func.toString()));
    global_blockly.addedEvListeners.push({type: "keydown", fun: listenerFunc});
    document.addEventListener("keydown", listenerFunc);
};

global_blockly.longPooling = function() {
    $.ajax({
        type: 'GET',
        url: '/scratch/data',
        success: function (json) {
            var o = JSON.parse(json);
            document.getElementById("sensor1").value = o["sensor_1"];
            document.getElementById("sensor2").value = o["sensor_2"];
            document.getElementById("sensor3").value = o["sensor_3"];
            document.getElementById("sensor4").value = o["sensor_4"];
            document.getElementById("sensor5").value = o["sensor_5"];
            setTimeout(global_blockly.longPooling, global_blockly.SENSORS_REQUSET_TIMEOUT);
        },
        error: function (mess) {
            //TODO: Error checking
            if (mess.responseText == "Port is not open" || mess.responseText == "No serial port selected")
                return;
            setTimeout(global_blockly.longPooling, global_blockly.SENSORS_REQUSET_TIMEOUT);
        }
    });
}

global_blockly.setDirection = function(direction) {

    global_blockly.direction = direction;

    /*If motor_on block was triggered previously*/
    if (global_blockly.is_engine_ready) {
        global_blockly.engine(global_blockly.timeout);
    }
}

global_blockly.engine = function(timeout) {

    /*If direction was not set in program earlier*/
    if (!global_blockly.direction) {
        global_blockly.is_engine_ready = true; //Run robot as soon as direction will be set.
        global_blockly.timeout = timeout; //Will be used when direction set.
        return;
    };

    clearTimeout(global_blockly.stop_timeoutID);
    global_blockly.is_engine_ready = false;

    $.ajax({
        type: 'GET',
        url: '/scratch/engine',
        data: {direction: global_blockly.direction}
    });
    if (timeout) {
        global_blockly.stop_timeoutID = setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: '/scratch/engine',
                data: {direction: '0'}
            });
        }, timeout);
    };
};

global_blockly.stopEngine = function() {

    clearTimeout(global_blockly.stop_timeoutID);
    global_blockly.is_engine_ready = false;

    $.ajax({
        type: 'GET',
        url: '/scratch/engine',
        data: {direction: '0'}
    });
};

global_blockly.engineAngle = function(direction, angle) {

    var HALF_ROUND_TIME = 4600; //Milliseconds
    var timeout = HALF_ROUND_TIME * angle / 180;

    global_blockly.direction = direction;
    global_blockly.engine(timeout);
    global_blockly.direction = null;
};

global_blockly.getSensorValue = function(sensorNum) {
    return document.getElementById("sensor" + sensorNum).value;
};

global_blockly.isSensorPushed = function(sensorNum) {
    return document.getElementById("sensor" + sensorNum).value > global_blockly.BUTTON_THRESHOLD;
};