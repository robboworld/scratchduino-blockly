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

function saveSensorSettings(sensor, num, name, type, thresholds) {
    sensor.settings.num = num;
    sensor.settings.name = name;
    sensor.settings.type = type;
    //TODO: Thresholds save
    sensor.settings.thresholds = [];
}

// TODO: Add area state changing when sensor choosed
$("#contextMenu #header span").click(closeContextMenu);
$("#contextMenu #save").click(saveContextMenu);
$("#contextMenu #remove").click(removeContextMenu);
$("#contextMenu .glyphicon-plus").click(addThreshold);

$("#robot_map area").click(onClickArea);
$("#robot_map area").each(initSensor);