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