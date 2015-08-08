/**
 * Created by Pais on 23.05.2015.
 *
 * This function searches for all occurrences of
 * macros calls in given code string and replaces
 * it with corresponding code.
 */

var MACRO_TURN_ON_SEC_BLOCK = "#ENGINE_ON_SEC(";
var MACRO_LOOP_REPEAT = "#loop";
var MACRO_PAUSE = "#PAUSE(";
var MACRO_IF = "#if (";

function processCodeMacro(code) {

    code = loopMacroProcessing(code);
    code = ifStatementProcessing(code);
    code = pauseMacroProcessing(code);
    code = engineMacroProcessing(code);
    return code;

    // Replace macro with corresponding code
    function engineMacroProcessing(code) {
        var turnOnBlocksIndices;

        turnOnBlocksIndices = searchOccurrences(code, MACRO_TURN_ON_SEC_BLOCK);

        var lastOccurrence;
        var time;
        var innerCode;
        var outerCode;
        var closingBracket;
        var generatedCode;

        while (turnOnBlocksIndices.length) {
            // Take indices of first and last symbol of current macro name
            lastOccurrence = turnOnBlocksIndices.pop();
            closingBracket = code.indexOf(')', lastOccurrence + MACRO_TURN_ON_SEC_BLOCK.length);

            // Take macro argument
            time = code.substring(lastOccurrence + MACRO_TURN_ON_SEC_BLOCK.length, closingBracket);
            // Take code after macro
            outerCode = code.substring(closingBracket + 1);
            // Code that will be executed after engine_on_sec
            innerCode = "";

            //Processing code may be defined in if statement or function
            var bracketIndex;
            if (~(bracketIndex = indexOfClosingBracket(outerCode))) {
                // If macro is in parent block
                innerCode = outerCode.slice(0, bracketIndex);
                outerCode = outerCode.substring(bracketIndex);
            } else {
                // If there is no parent block
                innerCode = outerCode;
                outerCode = "";
            }

            generatedCode =
                "global_blockly.engine(\"5\");\n" +
                "var id = setTimeout(function(){\n" +
                "\tglobal_blockly.engine(\"0\");\n" +
                "\t{0}\n".format(innerCode) +
                "}, {0});\n".format(time) +
                "global_blockly.main_program_timeoutIDs.push(id)\n" +
                outerCode;

            // Take part that wasn't change
            code = code.slice(0, lastOccurrence);
            // And add generated part
            code = code.concat(generatedCode);
        }

        return code;
    }

    // Insert afterloop code in setTimeout call
    function loopMacroProcessing(code) {
        var loopMacroIndices;

        loopMacroIndices = searchOccurrences(code, MACRO_LOOP_REPEAT);

        var lastOccurrence;
        var outerCode;
        var innerCode;
        var closingBracket;
        var openBracket;

        while (loopMacroIndices.length) {
            lastOccurrence = loopMacroIndices.pop();

            // Parsing of macro in format #loop/n/(/repeats/);
            // Delete # sing
            var tempString = code.substring(lastOccurrence + 1);
            code = code.slice(0, lastOccurrence);
            code = code.concat(tempString);

            // Take code after macro
            closingBracket = code.indexOf(')', lastOccurrence + MACRO_LOOP_REPEAT.length);
            openBracket = code.indexOf('(', lastOccurrence + MACRO_LOOP_REPEAT.length);
            outerCode = code.substring(closingBracket + 1);
            innerCode = "";

            //Processing code may be defined in if statement or function
            var bracketIndex;
            if (~(bracketIndex = indexOfClosingBracket(outerCode))) {
                // If macro is in parent block
                innerCode = outerCode.slice(0, bracketIndex);
                outerCode = outerCode.substring(bracketIndex);
            }
            else {
                // If there is no parent block
                innerCode = outerCode;
            }

            // Find "function loop/n/(..." string
            var loopName = code.substring(lastOccurrence, openBracket);
            var indexOfLoopFunction = code.indexOf('function ' + loopName);
            var insertIndex = code.indexOf('return;', indexOfLoopFunction);
            // Delete innerCode from original position
            tempString = code.substring(closingBracket + innerCode.length);
            code = code.slice(0, closingBracket + 2);
            code = code.concat(tempString);
            // Insert innerCode in 'if' statement of loop function
            tempString = code.substring(insertIndex);
            code = code.slice(0, insertIndex);
            code = code.concat(innerCode);
            code = code.concat(tempString);

            loopMacroIndices = searchOccurrences(code, MACRO_LOOP_REPEAT);
        }

        return code;
    }

    // Insert afterIF code in setTimeout call
    function ifStatementProcessing(code) {

        var firstOccurrence;
        var outerCode;
        var innerCode;
        var ifEndBracket;
        var elseEndBracket;

        var ifOpenBracket = 0;
        var elseOpenBracket;

        while ((firstOccurrence = code.indexOf(MACRO_IF, ifOpenBracket)) != -1) {

            // Delete macro sign '#'
            code = (code.slice(0, firstOccurrence)).concat(code.substring(firstOccurrence + 1));

            // Find end of 'else' statement
            ifOpenBracket = code.indexOf('{', firstOccurrence);
            ifEndBracket = indexOfClosingBracket(code.substring(ifOpenBracket + 1)) + ifOpenBracket + 1;
            elseOpenBracket = code.indexOf('{', ifEndBracket);
            elseEndBracket = indexOfClosingBracket(code.substring(elseOpenBracket + 1)) + elseOpenBracket + 1;

            innerCode = "";
            //Processing code may be defined in if statement or function
            var bracketIndex;
            outerCode = code.substring(elseEndBracket + 1);
            if (~(bracketIndex = indexOfClosingBracket(outerCode))) {
                // If macro is in parent block
                innerCode = outerCode.slice(0, bracketIndex);
                outerCode = outerCode.substring(bracketIndex);
            }
            else {
                // If there is no parent block
                innerCode = outerCode;
                outerCode = "";
            }

            // Insert innerCode to end of 'if' and 'else'
            // Insert in ELSE
            code = code.slice(0, elseEndBracket - 1);
            code = code.concat(innerCode) + '}\n';
            code = code.concat(outerCode);
            // Insert in ELSE
            var codeAfterIf = code.substring(ifEndBracket);
            code = code.slice(0, ifEndBracket - 1);
            code = code.concat(innerCode);
            code = code.concat(codeAfterIf);
        }

        return code;
    }

    function pauseMacroProcessing(code) {
        var pauseIndices;

        pauseIndices = searchOccurrences(code, MACRO_PAUSE);

        var lastOccurrence;
        var time;
        var innerCode;
        var outerCode;
        var closingBracket;
        var generatedCode;

        while (pauseIndices.length) {
            // Take indices of first and last symbol of current macro name
            lastOccurrence = pauseIndices.pop();
            closingBracket = code.indexOf(')', lastOccurrence + MACRO_PAUSE.length);

            // Take macro argument
            time = code.substring(lastOccurrence + MACRO_PAUSE.length, closingBracket);
            // Take code after macro
            outerCode = code.substring(closingBracket + 1);
            // Code that will be executed after engine_on_sec
            innerCode = "";

            //Processing code may be defined in if statement or function
            var bracketIndex;
            if (~(bracketIndex = indexOfClosingBracket(outerCode))) {
                // If macro is in parent block
                innerCode = outerCode.slice(0, bracketIndex);
                outerCode = outerCode.substring(bracketIndex);
            } else {
                // If there is no parent block
                innerCode = outerCode;
                outerCode = "";
            }

            generatedCode =
                "var id = setTimeout(function(){\n" +
                "\t{0}\n".format(innerCode) +
                "}, {0});\n".format(time) +
                "global_blockly.main_program_timeoutIDs.push(id)\n" +
                outerCode;

            // Take part that wasn't change
            code = code.slice(0, lastOccurrence);
            // And add generated part
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