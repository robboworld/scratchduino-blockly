/**
 * Created by xottab on 3/26/15.
 */
Blockly.JavaScript['engine_turn_on_sec'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'engine_turn_on_sec';
    return code;
};

Blockly.JavaScript['engine_turned_on'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'engine_turned_on';
    return code;
};


Blockly.JavaScript['engine_turned_off'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'engine_turned_off';
    return code;
};

Blockly.JavaScript['engine_set_power'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'engine_set_power';
    return code;
};

Blockly.JavaScript['engine_direction'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var key = block.getFieldValue('direction');
    var code = "$.ajax({\n"+
        "type: 'GET',\n"+
        "url: '/scratch/engine',\n"+
        "data: { direction: key},\n"+
        "success: alert(\"sent\")\n"+
    "});";
    return code;
};

Blockly.JavaScript['test'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'alert(\"test\");';
    return code;
};

