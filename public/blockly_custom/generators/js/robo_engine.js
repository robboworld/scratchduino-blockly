/**
 * Created by xottab on 3/26/15.
 */

Blockly.JavaScript['engine_turn_on_sec'] = function(block) {
    var sec_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
    var time = sec_time*1000; // To milliseconds

    var code = "global_blockly.engine(\"5\", {0});\n".format(time);
    return code;
};

Blockly.JavaScript['engine_turn_on'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "global_blockly.engine(\"5\");\n";
    return code;
};

Blockly.JavaScript['engine_turn_off'] = function(block) {
    var code = "global_blockly.engine(\"0\");\n";
    return code;
};

Blockly.JavaScript['engine_direction'] = function(block) {
    var key = block.getFieldValue('direction');

    var code = "global_blockly.setDirection({0});\n".format(key);
    return code;
};

Blockly.JavaScript['engine_angle'] = function(block) {
    var angle = block.getFieldValue('angle');
    var key = block.getFieldValue('direction');

    var code = "global_blockly.engineAngle({0}, {1});\n".format(key, angle);
    return code;
};

