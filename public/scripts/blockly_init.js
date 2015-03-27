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
            eval(code);
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-success");
            //var myInterpreter = new Interpreter(code);
            //myInterpreter.run();
        });
        $("#stopExecutionButton").click(function(){
            $("#launchCodeButton").removeClass("btn-success");
            $("#launchCodeButton").addClass("btn-primary");
        });
    }

);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}