/**
 * Created by xottab on 3/12/15.
 */

$(document).ready(
    function () {
        Blockly.inject(document.getElementById('blocklyDiv'),
            {toolbox: document.getElementById('toolbox')});

        function myUpdateFunction() {
            var code = Blockly.JavaScript.workspaceToCode();
            document.getElementById('jsOutput').value = code;
        }

        Blockly.addChangeListener(myUpdateFunction);
    }

);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}