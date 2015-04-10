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
    var code = '';
    return code;
};


Blockly.JavaScript['engine_turned_off'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "$.ajax({\n"+
        "type: 'GET',\n"+
        "url: '/scratch/engine',\n"+
        "data: { direction: '0'},\n"+
        "});";
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
        "data: { direction: "+key+"},\n"+
    "});";
    return code;
};

Blockly.JavaScript['test'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'alert(\"test\");';
    return code;
};

Blockly.JavaScript['sensor_value'] = function(block) {
    var dropdown_sensor_number = block.getFieldValue('sensor_number');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['reload_sensor_values'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "$.ajax({\n"+
        "type: 'GET',\n"+
        "url: '/scratch/data',\n"+
        "success: function(json){" +
            "alert(json);"+
        "}\n"+
        "});";
    return code;
};