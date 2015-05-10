/**
 * Created by Pais on 09.05.2015.
 */

function robot_interface() {

}

robot_interface.updateSensorsData = function() {
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
            global_blockly.robot_accessible = true;

            setTimeout(global_blockly.updateSensorsData, global_blockly.SENSORS_REQUSET_TIMEOUT);
        },
        error: function (res) {
            var err = JSON.parse(res.responseText);

            if (err.tech == "Disconnection") {
                alert(err.user);
                global_blockly.robot_accessible = false;
                return
            }
            if (err.tech == "Port is not open" || err.tech == "No serial port selected") {
                global_blockly.robot_accessible = false;
                return;
            }
            if (err.tech == "Data output interrupted") {
                // It's OK
            }
            setTimeout(global_blockly.updateSensorsData, global_blockly.SENSORS_REQUSET_TIMEOUT);
        }
    });
};

robot_interface.move = function(direction, timeout) {
    $.ajax({
        type: 'GET',
        url: '/scratch/engine',
        data: {direction: direction},
        success: function() {
            global_blockly.robot_accessible = true;
        },
        error: processEngineError
    });
    if (timeout) {
        global_blockly.engine_stop_timeoutID = setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: '/scratch/engine',
                data: {direction: '0'},
                success: function() {
                    global_blockly.robot_accessible = true;
                },
                error: processEngineError
            });
        }, timeout);
    };
};

function processEngineError(res) {

    var err = JSON.parse(res.responseText);

    if (err.tech == "Disconnection") {
        alert(err.user);
        global_blockly.robot_accessible = false;
        return;
    }
    if (err.tech == "Port is not open" || err.tech == "No serial port selected") {
        global_blockly.robot_accessible = false;
        return;
    }
}