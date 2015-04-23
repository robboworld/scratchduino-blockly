/**
 * Created by Pais on 23.04.2015.
 */

// Last clicked sensor
var currentSensor;

function closeContextMenu() {
    $("#contextMenu").hide();
};

function saveContextMenu() {
    closeContextMenu();
    //
    saveSensorSettings(
        currentSensor,
        $("#sensorNum").val(),
        $("#sensorNameInput").val(),
        $("#sensorTypeSelect").val(),
        $("#sensorThresholdsList").children
    );
};

function removeContextMenu() {
    closeContextMenu();
    //
    initSensor(6, currentSensor);
    initSensorMenu(currentSensor.settings);
};

function addThreshold(threshold) {
    var node = document.createElement("li");
    //
    if (threshold) {
        //
    }
    $("#sensorThresholdsList").append(node);
};

function onClickArea(e) {

    var contextMenu = $("#contextMenu");

    currentSensor = this;
    initSensorMenu(this.settings);

    contextMenu.css({
        display: "block",
        left: e.pageX,
        top: e.pageY
    });

    return false;
};

function initSensor(index, elem) {
    elem.settings = {};

    var num;
    switch(elem.id) {
        case "top_left": num = '1';
            break;
        case "bot_left": num = '2';
            break;
        case "bot_right": num = '3';
            break;
        case "top_center": num = '4';
            break;
        case "top_right": num = '5';
            break;
        default: //TODO: Error message
            break;
    };
    //TODO: Fix type numeration
    saveSensorSettings(elem, num, "sensor_" + num, "Касания", []);
}

function initSensorMenu(settings) {

    $("#sensorNum").val(settings.num);
    $("#sensorNameInput").val(settings.name);
    $("#sensorTypeSelect").val(settings.type);
    $("#sensorThresholdsList").empty();
    settings.thresholds.forEach(addThreshold);
}

function saveSensorSettings(sensor, newNum, newName, newType, newThresholds) {

    var sensorSettings = sensor.settings;

    // Find previous sensor with same number
    var sameNumSensor;
    $("#robot_map area").each(function(ind, elem) {
        if (!elem.settings) return;

        if (elem.settings.num === newNum) {
            sameNumSensor = elem;
        }
    });

    if (sameNumSensor !== undefined) {
        var sameNumSensorSettings = sameNumSensor.settings;
        var lastNum = sensor.settings.num;

        //Change it's num and name (if needed)
        if (sameNumSensorSettings != sensor) {
            sameNumSensorSettings.num = lastNum;

            if (sameNumSensorSettings.name == "sensor_" + newNum) {
                sameNumSensorSettings.name = "sensor_" + lastNum;
            }
        }
    }

    // Finally, apply new settings
    sensorSettings.num = newNum;
    sensorSettings.name = newName;
    sensorSettings.type = newType;
    //TODO: Thresholds save
    sensorSettings.thresholds = [];
}

//If sensors name didn't changed from default, change it with new number
function changeNameByNum() {
    var settings = currentSensor.settings;
    var lastNum = settings.num;
    var newNum = $("#sensorNum").val();

    if (settings.name == "sensor_" + lastNum) {
        $("#contextMenu #sensorNameInput").val("sensor_" + newNum);
    };
}

function exportSettings() {
    var settingsList = []
    $("#robot_map area").each(function(ind, elem) {
        settings.push(elem.settings);
    });
    //TODO: export logic
}

// TODO: Add area state changing when sensor choosed
$("#contextMenu #header span").click(closeContextMenu);
$("#contextMenu #save").click(saveContextMenu);
$("#contextMenu #remove").click(removeContextMenu);
$("#contextMenu .glyphicon-plus").click(addThreshold);
$("#contextMenu #sensorNum").change(changeNameByNum);

$("#robot_map area").click(onClickArea);
$("#robot_map area").each(initSensor);