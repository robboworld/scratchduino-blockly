/**
 * Created by Pais on 07.05.2015.
 */

function BlocklyCodeGenerator() {

    var code =
        "global_blockly.longPooling();\n" +
        "\n";

    var generated_code = code;

    this.generateCode = function(workspace_code) {
        generated_code = code + workspace_code;
        return generated_code;
    };

    this.getCode = function() {
        return generated_code;
    };

    this.closeCurrentSession = function() {
        global_blockly.addedEvListeners.forEach(function(elem) {
            document.removeEventListener(elem.type, elem.fun);
        });

        global_blockly.addedEvListeners = [];
    };

};