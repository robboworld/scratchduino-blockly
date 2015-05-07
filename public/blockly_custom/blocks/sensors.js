/**
 * Created by root on 4/24/15.
 */


Blockly.Blocks['sensor_value'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("значение сенсора")
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"]
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
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"]
            ]), "sensor_number")
            .appendField("нажата");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setTooltip('');
    }
};