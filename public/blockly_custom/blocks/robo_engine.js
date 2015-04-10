/**
 * Created by xottab on 3/26/15.
 */
Blockly.Blocks['engine_turn_on_sec'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendValueInput("time")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("включить мотор на");
        this.appendDummyInput()
            .appendField("сек");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['engine_turned_on'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("мотор вкл");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['test'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("тест");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['engine_turned_off'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("мотор выкл");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['engine_set_power'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendValueInput("value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("мощность мотора");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['engine_direction'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("мотор в");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["влево", "2"], ["вправо", "3"], ["вперёд", "4"],["назад", "1"]]), "direction");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

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