/**
 * Created by root on 4/24/15.
 */

var db ={};

function reloadDb(){
    $.ajax({
        type: "GET",
        url: "/allSensors",
        async: false,
        success: function (data) {
            db.sensors = JSON.parse(data);
        },
        error: function () {
        }
    });
}

Blockly.Blocks['sensor_value'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("значение сенсора")
            .appendField(new Blockly.FieldDropdown([
                ["1", "sensor1"],
                ["2", "sensor2"],
                ["3", "sensor3"],
                ["4", "sensor4"],
                ["5", "sensor5"]
            ]), "sensor_number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

Blockly.Blocks['button_pushed'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("кнопка")
            .appendField(new Blockly.FieldDropdown([
                ["1", "sensor1"],
                ["2", "sensor2"],
                ["3", "sensor3"],
                ["4", "sensor4"],
                ["5", "sensor5"]
            ]), "sensor_number")
            .appendField("нажата");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setTooltip('');
    }
};

Blockly.Blocks['reload_sensor_values'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Обновить данные с сенсоров");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};