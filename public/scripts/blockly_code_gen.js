/**
 * Created by Pais on 07.05.2015.
 */

var SENSORS_DATA_TIMEOUT = 100;
var BUTTON_THRESHOLD = 250;
var stop_timeoutID = null;
var data_timeoutID = null;
var addedEvListeners = [];

function global_blockly_createNewKeyListener(keyCode, action_func) {
    var listenerFunc = new Function("event",
        "if(event.keyCode == {0}) ({1})();\n".format(keyCode, action_func.toString()));
    addedEvListeners.push({type: "keydown", fun: listenerFunc});
    document.addEventListener("keydown", listenerFunc);
};

function global_blockly_longPooling() {
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
            setTimeout(global_blockly_longPooling, SENSORS_DATA_TIMEOUT);
        },
        error: function (mess) {
            //TODO: Error checking
            if (mess.responseText == "Port is not open" || mess.responseText == "No serial port selected")
                return;
            setTimeout(global_blockly_longPooling, SENSORS_DATA_TIMEOUT);
        }
    });
}

function global_blockly_engine(direction, timeout) {
    clearTimeout(stop_timeoutID);
    $.ajax({
        type: 'GET',
        url: '/scratch/engine',
        data: {direction: direction}
    });
    if (timeout) {
        stop_timeoutID = setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: '/scratch/engine',
                data: {direction: '0'}
            });
        }, timeout);
    }
    ;
};

function global_blockly_getSensorValue(sensorNum) {
    return document.getElementById("sensor" + sensorNum).value;
};

function global_blockly_isSensorPushed(sensorNum) {
    return document.getElementById("sensor" + sensorNum).value > BUTTON_THRESHOLD;
};


function BlocklyCodeGenerator() {

    var code =
        "global_blockly_longPooling();\n" +
        "\n";

    var generated_code = code;

    this.generateCode = function(workspace_code) {
        generated_code = code + workspace_code;
        return generated_code;
    };

    this.getCode = function() {
        return generated_code;
    };

    this.closeCurrentSession = function() {
        addedEvListeners.forEach(function(elem) {
            document.removeEventListener(elem.type, elem.fun);
        });

        addedEvListeners = [];
    };

};