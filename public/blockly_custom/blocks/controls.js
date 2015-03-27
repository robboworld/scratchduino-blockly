/**
 * Created by xottab on 3/27/15.
 */
Blockly.Blocks['when_key_pressed'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(65);
        this.appendDummyInput()
            .appendField("когда клавиша");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [
                    ["стрелка вперед", "38"],
                    ["стрелка взад", "40"],
                    ["стрелка влево", "37"],
                    ["стрелка вправо", "39"],
                    ["пробел", "32"],
                    ["enter", "13"]
                ]), "key");
        this.appendDummyInput()
            .appendField("нажата");
        this.appendStatementInput("action");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};