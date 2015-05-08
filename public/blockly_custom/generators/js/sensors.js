/**
 * Created by root on 4/24/15.
 */
Blockly.JavaScript['sensor_value'] = function(block) {

    var sensorNum = block.getFieldValue('sensor_number');

    var code = "global_blockly.getSensorValue({0})\n".format(sensorNum);
    return code;
};

Blockly.JavaScript['button_pushed'] = function(block) {

    var sensorNum = block.getFieldValue('sensor_number');

    var code = "global_blockly.isSensorPushed({0})\n".format(sensorNum);
    return [code, Blockly.JavaScript.ORDER_NONE];
};