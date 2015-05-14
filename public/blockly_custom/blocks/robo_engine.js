/**
 * Created by xottab on 3/26/15.
 */
Blockly.Blocks['engine_turn_on_sec'] = {
    init: function () {
        function t(arg) {
            return i18n.t("blockly.toolbox.engine.engine_turn_on_sec." + arg);
        }

        this.setColour(210);
        this.appendDummyInput()
            .appendField(t("engine_on"));
        this.appendValueInput("time")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(t("by"));
        this.appendDummyInput()
            .appendField(t("sec"));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['engine_turn_on'] = {
    init: function () {
        function t(arg) {
            return i18n.t("blockly.toolbox.engine.engine_turn_on." + arg);
        }

        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(t("engine_on"));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['engine_turn_off'] = {
    init: function () {
        function t(arg) {
            return i18n.t("blockly.toolbox.engine.engine_turn_off." + arg);
        }

        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(t("engine_off"));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['engine_direction'] = {
    init: function () {
        function t(arg) {
            return i18n.t("blockly.toolbox.engine.engine_direction." + arg);
        }

        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(t("engine_to"));
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[t("up"), "4"], [t("down"), "1"], [t("left"), "2"], [t("right"), "3"]]), "direction");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['engine_angle'] = {
    init: function () {
        function t(arg) {
            return i18n.t("blockly.toolbox.engine.engine_angle." + arg);
        }

        this.setColour(210);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(t("turn"))
            .appendField(new Blockly.FieldDropdown([[t("to_left"), "2"], [t("to_right"), "3"]]), "direction")
            .appendField(t("by"))
            .appendField(new Blockly.FieldAngle("0"), "angle")
            .appendField(t("degrees"));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
