/**
 * Created by xottab on 3/27/15.
 */

// TODO: Key pressed for a long time (see: keyup event)

Blockly.JavaScript['when_key_pressed'] = function (block) {

    var key = block.getFieldValue('key');
    var action = Blockly.JavaScript.statementToCode(block, 'action');
    action = processCodeMacro(action);
    var code = "global_blockly.createNewKeyListener({0}, function(){{1}});\n".format(key, action);
    return code;
};

Blockly.JavaScript['while_program_running'] = function (block) {

    var action = Blockly.JavaScript.statementToCode(block, 'action');

    action = processCodeMacro(action);
    var code = "global_blockly.wholeProgramLoop(function(){{0}})".format(action);
    return code;
};

//var MACRO_TURN_ON_SEC_BLOCK = "#ENGINE_ON_SEC(";
//// More of predefined macros may be added
//
//function processCodeMacro(code) {
//
//    var turnOnBlocksIndices = [];
//
//    turnOnBlocksIndices = searchOccurrences(code, MACRO_TURN_ON_SEC_BLOCK);
//
//    var lastOccurrence;
//    var time;
//    var innerCode;
//    var outerCode;
//    var closingBracket;
//    var generatedCode;
//
//    while (turnOnBlocksIndices.length) {
//        lastOccurrence = turnOnBlocksIndices.pop();
//        closingBracket = code.indexOf(')', lastOccurrence + MACRO_TURN_ON_SEC_BLOCK.length);
//
//        time = code.substring(lastOccurrence + MACRO_TURN_ON_SEC_BLOCK.length, closingBracket);
//        innerCode = code.substring(closingBracket + 1);
//
//        var bracketIndex;
//        outerCode = "";
//        //Processing code may be defined in if statement or function
//        if (~(bracketIndex = indexOfClosingBracket(innerCode))) {
//            outerCode = innerCode.substring(bracketIndex);
//            innerCode = innerCode.slice(0, bracketIndex);
//        }
//
//        generatedCode =
//            "global_blockly.engine(\"5\");\n" +
//            "setTimeout(function(){" +
//            "{0};\n".format(innerCode) +
//            "global_blockly.engine(\"0\");\n" +
//            "}, {0});\n".format(time) + outerCode;
//
//        code = code.slice(0, lastOccurrence);
//        code = code.concat(generatedCode);
//    }
//
//    return code;
//
//    function searchOccurrences(code, substr) {
//        var indices = [];
//        var lastIndex;
//        var startIndex = 0;
//        var substr_length = substr.length;
//
//        while(~(lastIndex = code.indexOf(substr, startIndex))) {
//            indices.push(lastIndex);
//            startIndex = lastIndex + substr_length;
//        }
//
//        return indices;
//    }
//
//    function indexOfClosingBracket(code) {
//        var openBrCount = 0;
//        var closingBrCount = 0;
//        var index = 0;
//        var char;
//
//        while (openBrCount - closingBrCount >= 0) {
//            char = code.charAt(index++)
//            if (char == '{') {
//                openBrCount++;
//            } else if (char == '}') {
//                closingBrCount++;
//            }
//
//            if (index == code.length + 1) {
//                if (openBrCount == closingBrCount) {
//                    return -1;
//                } else {
//                    //ERROR!
//                    return -1;
//                }
//            }
//        }
//
//        return --index;
//    }
//}