/**
 * Created by Pais on 23.05.2015.
 *
 * This function searches for all occurrences of
 * macros calls in given code string and replaces
 * it with corresponding code.
 */

var MACRO_TURN_ON_SEC_BLOCK = "#ENGINE_ON_SEC(";

function processCodeMacro(code) {

    code = engineMacroProcessing(code);

    return code;

    //TODO: improve search algorithm
    //TODO: improve processing algorithm

    function engineMacroProcessing(code) {
        var turnOnBlocksIndices = [];

        turnOnBlocksIndices = searchOccurrences(code, MACRO_TURN_ON_SEC_BLOCK);

        var lastOccurrence;
        var time;
        var innerCode;
        var outerCode;
        var closingBracket;
        var generatedCode;

        while (turnOnBlocksIndices.length) {
            lastOccurrence = turnOnBlocksIndices.pop();
            closingBracket = code.indexOf(')', lastOccurrence + MACRO_TURN_ON_SEC_BLOCK.length);

            time = code.substring(lastOccurrence + MACRO_TURN_ON_SEC_BLOCK.length, closingBracket);
            innerCode = code.substring(closingBracket + 1);

            var bracketIndex;
            outerCode = "";
            //Processing code may be defined in if statement or function
            if (~(bracketIndex = indexOfClosingBracket(innerCode))) {
                outerCode = innerCode.substring(bracketIndex);
                innerCode = innerCode.slice(0, bracketIndex);
            }

            generatedCode =
                "global_blockly.engine(\"5\");\n" +
                "setTimeout(function(){\n" +
                "\tglobal_blockly.engine(\"0\");\n" +
                "\t{0}\n".format(innerCode) +
                "}, {0});\n".format(time) + outerCode;

            code = code.slice(0, lastOccurrence);
            code = code.concat(generatedCode);
        }

        return code;
    }

    function searchOccurrences(code, substr) {
        var indices = [];
        var lastIndex;
        var startIndex = 0;
        var substr_length = substr.length;

        while(~(lastIndex = code.indexOf(substr, startIndex))) {
            indices.push(lastIndex);
            startIndex = lastIndex + substr_length;
        }

        return indices;
    }

    function indexOfClosingBracket(code) {
        var openBrCount = 0;
        var closingBrCount = 0;
        var index = 0;
        var char;

        while (openBrCount - closingBrCount >= 0) {
            char = code.charAt(index++)
            if (char == '{') {
                openBrCount++;
            } else if (char == '}') {
                closingBrCount++;
            }

            if (index == code.length + 1) {
                if (openBrCount == closingBrCount) {
                    return -1;
                } else {
                    //ERROR!
                    return -1;
                }
            }
        }

        return --index;
    }
}