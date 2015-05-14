/**
 * Created by root on 4/24/15.
 */


Blockly.Blocks['sensor_value'] = {
    init: function() {
        function t(arg) {
            return i18n.t("blockly.toolbox.sensors.sensor_value." + arg);
        }
        this.setColour(20);
        this.appendDummyInput()
            .appendField(t("sensor_value"))
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"]
            ]), "sensor_number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.Blocks['button_pushed'] = {
    init: function() {
        function t(arg) {
            return i18n.t("blockly.toolbox.sensors.button_pushed." + arg);
        }
        this.setColour(20);
        this.appendDummyInput()
            .appendField(t("button"))
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"]
            ]), "sensor_number")
            .appendField(t("is_pressed"));
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
    }
};