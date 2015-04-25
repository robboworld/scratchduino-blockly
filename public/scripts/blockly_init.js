/**
 * Created by xottab on 3/12/15.
 */

var curELNumber = 0;

function getNextEventListenerNumber() {
    return curELNumber++;
}
function clearListeners() {
    addedEvListeners = [];
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

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function loadSketch(name, hash) {
    if (typeof(Storage) !== "undefined") {
        var xml = localStorage.getItem(hash);
        var dom = Blockly.Xml.textToDom(xml);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
        $("#loadSketchModal").modal("hide");
    } else {
        alert("Sorry, no local storage available");
    }
}

$(document).ready(
    function () {
        Blockly.inject(document.getElementById('blocklyDiv'),
            {toolbox: document.getElementById('toolbox')})
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);

        function backup_blocks() {
            var name = prompt("Введите название для скетча");
            if (name) {
                var id = uuid();
                $.ajax({
                    type: 'GET',
                    url: '/addHash',
                    data: {
                        blocklyHash: id,
                        hashName: name
                    },
                    success: function (json) {
                        if (typeof(Storage) !== "undefined") {
                            var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
                            var txt = new XMLSerializer().serializeToString(xml);
                            localStorage.setItem(id, Blockly.Xml.domToText(xml));
                            //console.log("backuped");
                        } else {
                            // Sorry! No web storage support..
                        }
                        alert("Success! Hash is: " + id);
                    },
                    error: function (e) {
                        alert("Fail :(");
                    }

                });
            }

        }


        function to_configuration_page() {
            document.location.href = "/configuration";
        };

        function myUpdateFunction() {
            code = Blockly.JavaScript.workspaceToCode();
            document.getElementById('jsOutput').value = code;
        }


        Blockly.addChangeListener(myUpdateFunction);

        $("#saveProgram").click(backup_blocks);
        $("#loadProgram").click(function (e) {
            $.ajax({
                type: 'GET',
                url: '/getAllHashes',
                success: function (html) {
                    var modal = $("#loadSketchModal");
                    modal.find(".modal-body").html(html);
                    modal.modal("toggle")
                },
                error: function () {
                    alert("Sorry, cannot load list of sketches");
                }
            });

        });
        $("#configureRobot").click(to_configuration_page);

        $("#launchCodeButton").click(function () {

            var self = $(this);
            //$("#stopExecutionButton").trigger('click');

            $.ajax({
                type: 'GET',
                url: '/scratch/on',
                contentType: 'application/json; charset=utf-8',
                success: function (message) {
                    // TODO: Response message will bw fixed
                    // TODO: What if robot not using in program?
                    if (message == "No serial port selected.") {
                        alert("Робот не настроен!");

                        return;
                    }

                    eval(code);

                    self.removeClass("btn-primary");
                    self.addClass("btn-success");
                    self.blur();
                }
            });
        });
        $("#stopExecutionButton").click(function () {
            clearAllListeners();
            $("#launchCodeButton").removeClass("btn-success");
            $("#launchCodeButton").addClass("btn-primary");

            $.ajax({
                type: 'GET',
                url: '/scratch/off',
                contentType: 'application/json; charset=utf-8'
            });

            $(".sensors").find("input[type = text]").val("");
        });
    }
);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}