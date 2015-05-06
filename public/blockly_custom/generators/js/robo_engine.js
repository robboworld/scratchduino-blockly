/**
 * Created by xottab on 3/26/15.
 */
Blockly.JavaScript['engine_turn_on_sec'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'engine_turn_on_sec';
    return code;
};

//Blockly.JavaScript['engine_turned_on'] = function(block) {
//    // TODO: Assemble JavaScript into code variable.
//    var code = "..."
//    return code;
//};

Blockly.JavaScript['engine_turned_off'] = function(block) {
    var code = "$.ajax({\n"+
        "type: 'GET',\n"+
        "url: '/scratch/engine',\n"+
        "data: { direction: '0'},\n"+
        "});";
    return code;
};

Blockly.JavaScript['engine_direction'] = function(block) {
    var key = block.getFieldValue('direction');
    var code = "$.ajax({\n"+
        "type: 'GET',\n"+
        "url: '/scratch/engine',\n"+
        "data: { direction: "+key+"},\n"+
    "});";
    return code;
};

