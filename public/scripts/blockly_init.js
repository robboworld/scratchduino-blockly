/**
 * Created by xottab on 3/12/15.
 */

var curELNumber = 0;
function getNextEventListenerNumber() {
    return curELNumber++;
}
function clearListeners() {
    addedEvListeners=[];
    curELNumber = 0;
}

var addedEvListeners = [];

var code;

function initApi(interpreter, scope) {
    // Add an API function for the alert() block.
    var wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(alert(text));
    };
    interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(scope, 'prompt',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the addEventListener() block.

    interpreter.setProperty(scope, 'document',
        interpreter.createPrimitive(document));
    var wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(alert(text));
    };
    interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(wrapper));
}

function clearAllListeners() {
    for (var i = 0; i < addedEvListeners.length; ++i) {
        var tmp = addedEvListeners[i];
        document.removeEventListener(tmp.type, tmp.fun);
    }
    clearListeners();
}

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

$(document).ready(
    function () {
        Blockly.inject(document.getElementById('blocklyDiv'),
            {toolbox: document.getElementById('toolbox')});

        function myUpdateFunction() {
            code = Blockly.JavaScript.workspaceToCode();
            document.getElementById('jsOutput').value = code;
        }

        Blockly.addChangeListener(myUpdateFunction);

        $("#launchCodeButton").click(function () {
            $("#stopExecutionButton").trigger('click');
            $.ajax({
                type: 'GET',
                url: '/scratch/on',
                contentType: 'application/json; charset=utf-8'
            });

            eval(code);

            $(this).removeClass("btn-primary");
            $(this).addClass("btn-success");
        });
        $("#stopExecutionButton").click(function () {
            clearAllListeners();
            $("#launchCodeButton").removeClass("btn-success");
            $("#launchCodeButton").addClass("btn-primary");
        });
    }
);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}