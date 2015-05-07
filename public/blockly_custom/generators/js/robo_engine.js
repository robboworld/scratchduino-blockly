/**
 * Created by xottab on 3/26/15.
 */

Blockly.JavaScript['engine_turn_on_sec'] = function(block) {
    var key = block.getFieldValue('direction');
    var sec_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
    var time = sec_time*1000; // To milliseconds

    var code = "global_blockly_engine({0}, {1});\n".format(key, time);
    return code;
};

//Blockly.JavaScript['engine_turned_on'] = function(block) {
//    // TODO: Assemble JavaScript into code variable.
//    var code = "..."
//    return code;
//};

Blockly.JavaScript['engine_turned_off'] = function(block) {
    var code = "global_blockly_engine(\"0\");\n";
    return code;
};

Blockly.JavaScript['engine_direction'] = function(block) {
    var key = block.getFieldValue('direction');

    var code = "global_blockly_engine({0});\n".format(key);
    return code;
};

