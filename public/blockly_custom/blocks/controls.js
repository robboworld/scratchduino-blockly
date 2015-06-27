/**
 * Created by xottab on 3/27/15.
 */


Blockly.Blocks['when_key_pressed'] = {
    init: function () {
        function t(arg){
            return i18n.t("blockly.toolbox.controls.when_key_pressed."+arg);
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
                    [t("enter"), "13"],
                    ["0", "48"],
                    ["1", "49"],
                    ["2", "50"],
                    ["3", "51"],
                    ["4", "52"],
                    ["5", "53"],
                    ["6", "54"],
                    ["7", "55"],
                    ["8", "56"],
                    ["9", "57"],
                    //["a", "65"],
                    //["b", "66"],
                    //["c", "67"],
                    //["d", "68"],
                    //["e", "69"],
                    //["f", "70"],
                    //["g", "71"],
                    //["h", "72"],
                    //["i", "73"],
                    //["j", "74"],
                    //["k", "75"],
                    //["l", "76"],
                    //["m", "77"],
                    //["n", "78"],
                    //["o", "79"],
                    //["p", "80"],
                    //["q", "81"],
                    //["r", "82"],
                    //["s", "83"],
                    //["t", "84"],
                    //["u", "85"],
                    //["v", "86"],
                    //["w", "87"],
                    //["x", "88"],
                    //["y", "89"],
                    //["z", "90"]
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
            return i18n.t("blockly.toolbox.controls.while_program_running."+arg);
        }
        this.setColour(65);
        this.appendDummyInput()
            .appendField(t("while_program_is_running"));
        this.appendStatementInput("action");
        this.setInputsInline(true);
        this.setNextStatement(true);
    }
};