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
            setTimeout(global_blockly.updateSensorsData, global_blockly.SENSORS_REQUSET_TIMEOUT);
        },
        error: function (res) {
            var err = JSON.parse(res.responseText);

            if (err.tech == "Disconnection") {
                alert(err.user);
                return
            }
            if (err.tech == "Port is not open" || err.tech == "No serial port selected") {
                return;
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
        error: processEngineError
    });
    if (timeout) {
        global_blockly.stop_timeoutID = setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: '/scratch/engine',
                data: {direction: '0'},
                error: processEngineError
            });
        }, timeout);
    };
};

function processEngineError(res) {

    var err = JSON.parse(res.responseText);

    if (err.tech == "Disconnection") {
        alert(err.user);
        return;
    }
    if (err.tech == "Port is not open" || err.tech == "No serial port selected") {
        return;
    }
}