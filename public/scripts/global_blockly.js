/**
 * Created by Pais on 08.05.2015.
 */


function global_blockly() {

};

global_blockly.SENSORS_REQUSET_TIMEOUT = 100;
global_blockly.MAIN_PROGRAM_TIMEOUT = 200;
global_blockly.BUTTON_THRESHOLD = 1020;

global_blockly.robot_accessible = false;    //Should be set before each running blockly program
global_blockly.addedEvListeners = [];
global_blockly.main_program_timeoutIDs = [];

global_blockly.wholeProgramLoop = function(action_func) {
    var timeoutID = setTimeout(function timeoutBody() {
        action_func();
        var timeout = setTimeout(timeoutBody, global_blockly.MAIN_PROGRAM_TIMEOUT);
        global_blockly.main_program_timeoutIDs.push(timeout);
    }, global_blockly.MAIN_PROGRAM_TIMEOUT);

    global_blockly.main_program_timeoutIDs.push(timeoutID);
}

global_blockly.createNewKeyListener = function(keyCode, action_func) {
    var listenerFunc = new Function("event",
        "if(event.keyCode == {0}) {".format(keyCode) +
            "event.preventDefault();" +
            "({0})();".format(action_func.toString()) +
        "}\n");
    global_blockly.addedEvListeners.push({type: "keydown", fun: listenerFunc});
    document.addEventListener("keydown", listenerFunc);
};

global_blockly.updateSensorsData = function() {

    if (global_blockly.robot_accessible) {
        robot_interface.updateSensorsData();
    };
    //sprite_interface.updateSensorsData();

}

global_blockly.setDirection = function(direction) {

    if (global_blockly.robot_accessible) {
        robot_interface.setDirection(direction)
    };
    sprite_interface.setDirection(direction);
}

global_blockly.engine = function(mode, timeout) {

    if (global_blockly.robot_accessible) {
        robot_interface.move(mode, timeout);
    };
    sprite_interface.move(mode, timeout);

};

global_blockly.engineAngle = function(direction, angle) {

    var HALF_ROUND_TIME = 4600; //milliseconds
    var timeout = HALF_ROUND_TIME * angle / 180;

    global_blockly.setDirection(direction);
    global_blockly.engine("5", timeout);
};

global_blockly.getSensorValue = function(sensorNum) {
    return document.getElementById("sensor" + sensorNum).value;
};

global_blockly.isSensorPushed = function(sensorNum) {
    return document.getElementById("sensor" + sensorNum).value > global_blockly.BUTTON_THRESHOLD;
};