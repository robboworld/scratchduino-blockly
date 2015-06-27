/**
 * Created by xottab on 3/27/15.
 */

Blockly.JavaScript['when_key_pressed'] = function (block) {

    var key = block.getFieldValue('key');
    var action = Blockly.JavaScript.statementToCode(block, 'action');

    var actionWrapped = global_blockly.wrappers.key_listener_wrapper(key, action);
    var code = "global_blockly.createNewKeyListener(function(event) {{0}});\n".format(actionWrapped);
    return code;
};

Blockly.JavaScript['while_program_running'] = function (block) {

    var action = Blockly.JavaScript.statementToCode(block, 'action');

    var code = global_blockly.wrappers.while_programm_loop_wrapper(action);
    return code;
};

/*Reimplemented default loop blocks. setTimeout() function used instead of while() loop.*/
Blockly.JavaScript['controls_whileUntil'] = function (block) {

    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
            until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
                Blockly.JavaScript.ORDER_NONE) || 'false';
    var action = Blockly.JavaScript.statementToCode(block, 'DO');

    var code = global_blockly.wrappers.while_until_loop_wraper(action, argument0);
    return code;
}

Blockly.JavaScript['controls_repeat_ext'] = function (block) {

    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
            Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var action = Blockly.JavaScript.statementToCode(block, 'DO');

    var code = global_blockly.wrappers.repeat_loop_wraper(action, repeats);
    return code;
}