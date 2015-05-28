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

// Next object needed to correctly process key keeping by user
global_blockly.NOT_PRESSED = -1;
global_blockly.PUSHED_DOWN = 0;
global_blockly.PUSHED_UP = 1;
global_blockly.keys_state = {
    38: global_blockly.NOT_PRESSED, //arrow up
    40: global_blockly.NOT_PRESSED, //arrow down
    37: global_blockly.NOT_PRESSED, //arrow left
    39: global_blockly.NOT_PRESSED, //arrow right
    32: global_blockly.NOT_PRESSED, //space
    13: global_blockly.NOT_PRESSED  //enter
}

global_blockly.wholeProgramLoop = function(action_func) {
    var timeoutID = setTimeout(function timeoutBody() {
        action_func();
        var timeout = setTimeout(timeoutBody, global_blockly.MAIN_PROGRAM_TIMEOUT);
        global_blockly.main_program_timeoutIDs.push(timeout);
    }, global_blockly.MAIN_PROGRAM_TIMEOUT);

    global_blockly.main_program_timeoutIDs.push(timeoutID);
};

global_blockly.repeatLoop = function(repeats, action_func) {
    function timeoutBody(repeats) {
        console.log("repeats = " + repeats);
        if (repeats-- <= 0) {
            return;
        };
        action_func();
        var timeout = setTimeout(timeoutBody, global_blockly.MAIN_PROGRAM_TIMEOUT, repeats);
        global_blockly.main_program_timeoutIDs.push(timeout);
    };

    var timeoutID = setTimeout(timeoutBody, global_blockly.MAIN_PROGRAM_TIMEOUT, repeats);

    global_blockly.main_program_timeoutIDs.push(timeoutID);
}

global_blockly.whileUntilLoop = function(condition, action_func) {
    if (condition) {}
};

global_blockly.createNewKeyListener = function(keyCode, action_func) {

    var listenerFunc = new Function("event",
        "if (event.keyCode == {0}) {".format(keyCode) +
        "if (global_blockly.keys_state[event.keyCode] == global_blockly.PUSHED_DOWN) {" +
        "\treturn;" +
        "} else {" +
        "\tevent.preventDefault();" +
        "\tglobal_blockly.keys_state[event.keyCode] = global_blockly.PUSHED_DOWN;" +
        "\t({0})();".format(action_func.toString()) +
        "}}\n");

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

global_blockly.engine = function(mode) {

    if (global_blockly.robot_accessible) {
        robot_interface.move(mode);
    };
    sprite_interface.move(mode);

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