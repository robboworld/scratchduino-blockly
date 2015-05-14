/**
 * Created by xottab on 3/27/15.
 */


Blockly.Blocks['when_key_pressed'] = {
    init: function () {
        function t(arg){
            return i18n.t("blockly.toolbox.operators.when_key_pressed."+arg);
        }
        this.setColour(65);
        this.appendDummyInput()
            .appendField(t("when_key"));
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [
                    [t("arrow_up"), "38"],
                    [t("arrow_down"), "40"],
                    [t("arrow_left"), "37"],
                    [t("arrow_right"), "39"],
                    [t("space"), "32"],
                    [t("enter"), "13"]
                ]), "key");
        this.appendDummyInput()
            .appendField(t("is_pressed"));
        this.appendStatementInput("action");
        this.setInputsInline(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['while_program_running'] = {
    init: function () {
        function t(arg){
            return i18n.t("blockly.toolbox.operators.while_program_running."+arg);
        }
        this.setColour(65);
        this.appendDummyInput()
            .appendField(t("while_program_is_running"));
        this.appendStatementInput("action");
        this.setInputsInline(true);
        this.setNextStatement(true);
    }
};