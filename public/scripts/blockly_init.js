/**
 * Created by xottab on 3/12/15.
 */

//var spriteCodeGen = new SpriteCodeGenerator();


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

        var blocklyCodeGen = new BlocklyCodeGenerator();

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
        }

        function myUpdateFunction() {


            blocklyCodeGen.generateCode(Blockly.JavaScript.workspaceToCode());

            document.getElementById('jsOutput').value = blocklyCodeGen.getCode();
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

            /* If already run*/
            if ($(this).hasClass("btn-success")) {
                return;
            }

            var self = $(this);

            $.ajax({
                type: 'GET',
                url: '/scratch/on',
                contentType: 'application/json; charset=utf-8',
                success: function (message) {

                    eval(blocklyCodeGen.getCode());

                    self.removeClass("btn-primary");
                    self.addClass("btn-success");
                    self.blur();
                }
            });
            eval(Blockly.JavaScript.workspaceToCode());
        });

        $("#stopExecutionButton").click(function () {

            window.clearInterval(robotSpriteMovingInterval);
            //TODO: close port if page is refreshed
            $.ajax({
                type: 'GET',
                url: '/scratch/off',
                contentType: 'application/json; charset=utf-8'
            });

            /*If program is not running*/
            if ($("#launchCodeButton").hasClass("btn-primary")) {
                return;
            }

            blocklyCodeGen.closeCurrentSession();
            $("#launchCodeButton").removeClass("btn-success");
            $("#launchCodeButton").addClass("btn-primary");

            //setTimeout(function() {
                $(".sensors").find("input[type = text]").val("");
            //}, 1000);
        });
    }

);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}