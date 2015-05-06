/**
 * Created by xottab on 3/27/15.
 */

var eventListenerName = "blocklyEventListener";

// TODO: Key pressed for a long time (see: keyup event)

Blockly.JavaScript['when_key_pressed'] = function (block) {
    var key = block.getFieldValue('key');
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
    // TODO: Assemble JavaScript into code variable.
    var number = getNextEventListenerNumber();
    var funName = eventListenerName + number;
    var func =
        ('function {0} (event){\n' +
        'if(event.keyCode=={1}){\n' +
        '{2}\n' +
        '}\n' +
        '}\n').format(funName, key, statements_action);
    var code =
        ('{0}addedEvListeners.push({type: "keydown", fun: {1}});\ndocument.addEventListener("keydown",{2});\n')
            .format(func, funName, funName);
    return code;
};