/**
 * Created by xottab on 3/12/15.
 */

var code;
$(document).ready(
    function () {
        Blockly.inject(document.getElementById('blocklyDiv'),
            {toolbox: document.getElementById('toolbox')});

        function myUpdateFunction() {
            code = Blockly.JavaScript.workspaceToCode();
            document.getElementById('jsOutput').value = code;
        }

        Blockly.addChangeListener(myUpdateFunction);

        $("#launchCodeButton").click(function(){
            alert("HELLO!!");
            alert(code);
            var myInterpreter = new Interpreter(code);
            myInterpreter.run();
        })
    }

);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}