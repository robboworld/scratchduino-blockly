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

    var code = "global_blockly.main_program_intervalID = setInterval(function() {\n" +
        "{0}\n".format(action) +
    "}, global_blockly.MAIN_PROGRAM_INTERVAL);\n";
    return code;
};