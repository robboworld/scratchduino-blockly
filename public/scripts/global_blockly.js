/**
 * Created by Pais on 08.05.2015.
 */

function global_blockly() {

};

global_blockly.SENSORS_REQUSET_TIMEOUT = 100;
global_blockly.MAIN_PROGRAM_TIMEOUT = 200;
global_blockly.BUTTON_THRESHOLD = 1000;

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
    13: global_blockly.NOT_PRESSED, //enter
    48: global_blockly.NOT_PRESSED, //0
    49: global_blockly.NOT_PRESSED, //1
    50: global_blockly.NOT_PRESSED, //2
    51: global_blockly.NOT_PRESSED, //3
    52: global_blockly.NOT_PRESSED, //4
    53: global_blockly.NOT_PRESSED, //5
    54: global_blockly.NOT_PRESSED, //6
    55: global_blockly.NOT_PRESSED, //7
    56: global_blockly.NOT_PRESSED, //8
    57: global_blockly.NOT_PRESSED //9
}

// Generate code for control blocks
global_blockly.wrappers = {

    //Number of loops in program. Used in loop function names.
    n: 0,

    // Creates listener function body for key press processing.
    // Checks whether this key is already pressed and cancel PUSHED state if action
    // was performed. It allows user to keep key pressed without danger of uncontrolled
    // flow of queries to server.
    key_listener_wrapper: function (keyCode, action) {

        return "\nif (event.keyCode == {0}) {\n".format(keyCode) +
            "\tevent.preventDefault();\n" +
            "\tif (global_blockly.keys_state[event.keyCode] == global_blockly.PUSHED_DOWN) {\n" +
            "\t\treturn;\n" +
            "\t} else {\n" +
            "\t\tglobal_blockly.keys_state[event.keyCode] = global_blockly.PUSHED_DOWN;\n" +
            "\t\t" + action + "\n;" +
            "\t\tglobal_blockly.keys_state[event.keyCode] = global_blockly.NOT_PRESSED;\n" +
            "\t}" +
            "}\n";
    },

    while_programm_loop_wrapper: function (action) {
        var loopName = "loop" + global_blockly.wrappers.n++;

        return "function " + loopName + "() {\n" +
            "\t" + action + ";\n" +
            "\tvar id = setTimeout(" + loopName + ", 50);\n" +
            "\tglobal_blockly.main_program_timeoutIDs.push(id);\n" +
            "};\n" +
            loopName + "();\n";
    },

    while_until_loop_wraper: function (action, condition) {
        var loopName = "loop" + ++global_blockly.wrappers.n;

        return "function " + loopName + "() {\n" +
            "\tif (!{0}) {\n".format(condition) +
            "\t\treturn;" +
            "\t};\n" +
            "\t" + action + ";\n" +
            "\tvar id = setTimeout(" + loopName + ", 50);\n" +
            "\tglobal_blockly.main_program_timeoutIDs.push(id);\n" +
            "};\n" +
            "#" + loopName + "();\n";
    },

    repeat_loop_wraper: function (action, repeats) {
        var loopName = "loop" + ++global_blockly.wrappers.n;
        var argName = "repeats" + global_blockly.wrappers.n;

        return "function " + loopName + "(" + argName + ") {\n" +
            "\tif (" + argName + "-- <= 0) {\n" +
            "\t\treturn;" +
            "\t};\n" +
            "\t" + action + ";\n" +
            "\tvar id = setTimeout(" + loopName + ", 50, " + argName + ");\n" +
            "\tglobal_blockly.main_program_timeoutIDs.push(id);\n" +
            "};\n" +
            "#" + loopName + "({0});\n".format(repeats);
    }
};

global_blockly.createNewKeyListener = function(listenerFunc) {

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