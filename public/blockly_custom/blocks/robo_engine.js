/**
 * Created by xottab on 3/26/15.
 */
Blockly.Blocks['engine_turn_on_sec'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .appendField("мотор вкл");
        this.appendValueInput("time")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("на");
        this.appendDummyInput()
            .appendField("сек");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['engine_turn_on'] = {
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

Blockly.Blocks['engine_turn_off'] = {
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

Blockly.Blocks['engine_direction'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("мотор в");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["вперёд", "4"],["назад", "1"],["влево", "2"], ["вправо", "3"]]), "direction");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['engine_angle'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("повернуть")
            .appendField(new Blockly.FieldDropdown([["влево", "2"], ["вправо", "3"]]), "direction")
            .appendField("на")
            .appendField(new Blockly.FieldAngle("0"), "angle")
            .appendField("градусов");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};
