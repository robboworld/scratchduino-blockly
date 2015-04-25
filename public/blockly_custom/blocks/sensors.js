/**
 * Created by root on 4/24/15.
 */

Blockly.Blocks['sensor_value'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Значение сенсора")
            .appendField(new Blockly.FieldDropdown([
                ["1", "sensor_1"],
                ["2", "sensor_2"],
                ["3", "sensor_3"],
                ["4", "sensor_4"],
                ["5", "sensor_5"]
            ]), "sensor_number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
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

Blockly.Blocks['sensor_1'] = {
    init: function() {
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Сенсор 1 не указан");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

Blockly.Blocks['sensor_2'] = {
    init: function() {
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Сенсор 2 не указан");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

Blockly.Blocks['sensor_3'] = {
    init: function() {
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Сенсор 3 не указан");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

Blockly.Blocks['sensor_4'] = {
    init: function() {
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Сенсор 4 не указан");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

Blockly.Blocks['sensor_5'] = {
    init: function() {
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Сенсор 5 не указан");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};