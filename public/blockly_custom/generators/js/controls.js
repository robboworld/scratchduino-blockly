/**
 * Created by xottab on 3/27/15.
 */

// TODO: Key pressed for a long time (see: keyup event)

Blockly.JavaScript['when_key_pressed'] = function (block) {

    var key = block.getFieldValue('key');
    var action = Blockly.JavaScript.statementToCode(block, 'action');

    var code = "global_blockly.createNewKeyListener({0}, function(){{1}});\n".format(key, action);
    return code;
};

Blockly.JavaScript['while_program_running'] = function (block) {

    var action = Blockly.JavaScript.statementToCode(block, 'action');

    var code = "global_blockly.wholeProgramLoop(function(){{0}})".format(action);
    return code;
};

/*Reimplemented default loop blocks. setTimeout() function used instead of while() loop.*/
Blockly.JavaScript['controls_whileUntil'] = function (block) {

    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
            until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
                Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');

    var code = "global_blockly.wholeProgramLoop(function(){{0}})".format(branch);
    return code;
}

Blockly.JavaScript['controls_repeat_ext'] = function (block) {

    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
            Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');

    var code = "global_blockly.repeatLoop({0}, function(){{1}})".format(repeats, branch);
    return code;
}