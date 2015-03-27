/**
 * Created by xottab on 3/27/15.
 */

Blockly.JavaScript['when_key_pressed'] = function(block) {
    var key = block.getFieldValue('key');
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
    // TODO: Assemble JavaScript into code variable.
    var code = 'document.addEventListener(\"keydown\",function(event){\n' +
            'if(event.keyCode=='+key+'){\n' +
                statements_action+'\n'+
            '}\n' +
        '});\n';
    return code;
};