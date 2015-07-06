/**
 * Created by xottab on 3/12/15.
 */

var workspace;

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

// Code executed after selectPort button clicked
function requestPorts() {
    $("#portsList").empty();

    $.ajax({
        type: "GET",
        url: "/scratch/ports",
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            successPort(json);
        },
        error: function () {
            //
        }
    });

    /*Create waiting animation*/
    var li = document.createElement("li");
    var span = document.createElement("span");

    li.innerText = i18n.t("main.loading");
    span.className = "glyphicon glyphicon-refresh glyphicon-refresh-animate";
    li.appendChild(span);
    $("#portsList").append(li);
}

function successPort(json) {

    var ports = JSON.parse(json);
    var $portsList = $("#portsList");

    // Delete waiting animation
    $portsList.empty();

    // If no ports available
    if (!ports.length) {
        var li = createListItem(i18n.t("main.noPorts"), null);
        $portsList.append(li);

        $("#selectPortButton").text(i18n.t("main.portNotChosen"));
    } else {
        for (var i = 0; i < ports.length; i++) {
            var li = createListItem(ports[i].name, onPortSelected);
            $portsList.append(li);
        }
    }

    function createListItem(text, onClickFunc) {
        var li = document.createElement("li");
        var a = document.createElement("a");

        a.innerHTML = text;
        a.onclick = onClickFunc;
        li.appendChild(a);

        return li;
    }

    function onPortSelected() {
        var self = this;

        $("#selectPortButton").text(this.innerText);
        $.ajax({
                type: "GET",
                url: "scratch/set_port",
                data: {
                    port: self.innerText
                }
            }
        );
    }
}

function download_sketch() {
    bootbox.prompt(i18n.t("prompt.sketch_name"), function(name){
        if (name) {
            var xml = Blockly.Xml.workspaceToDom(workspace);
            var blob = new Blob([new XMLSerializer().serializeToString(xml)], {
                type: "text/xml;charset=utf-8;"
            });
            saveAs(blob, name + ".blocks");
        }
    });
}

function to_configuration_page() {
    document.location.href = "/configuration";
}

var langs = ["ru", "en"];
var defaultLang = "ru";

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function init() {

    var blocklyCodeManager = new BlocklyCodeManager();

    // If port is open by this or another app, close it
    $.ajax({
            type: 'GET',
            url: '/scratch/isPortOpen',
            contentType: 'charset=utf-8',
            async: false,
            success: function(res) {
                if (res.toString() == true.toString()) {
                    $.ajax({
                        type: 'GET',
                        url: '/scratch/off',
                        contentType: 'application/json; charset=utf-8'
                    });
                } else {
                    // Nothing to do
                }
            }
        }
    );

    workspace = Blockly.inject(document.getElementById('blocklyDiv'),
        {toolbox: document.getElementById('toolbox')})

    function myUpdateFunction() {
        //blocklyCodeManager.generateCode(Blockly.JavaScript.workspaceToCode(workspace));
        blocklyCodeManager.generateCode(Blockly.JavaScript.workspaceToCode());
        document.getElementById('jsOutput').value = blocklyCodeManager.getCode();
    }

    //workspace.addChangeListener(myUpdateFunction);
    Blockly.addChangeListener(myUpdateFunction);

    // Save/Load logic
    $("#saveProgram").click(download_sketch);

    $("#newProgram").click(function (e) {
        bootbox.confirm(i18n.t("confirm.saveCurrentProgram"), function(result){
            if(result){
                download_sketch();
                Blockly.mainWorkspace.clear();
            }
        });
    });

    $("#loadProgram").click(function (e) {
        var modal = $("#loadSketchModal");
        modal.modal("toggle");
    });

    // Configuration page link
    $("#configureRobot").click(to_configuration_page);

    // Run/Stop logic
    $("#launchCodeButton").click(function () {
        if (blocklyCodeManager.runCode(BlocklyCodeManager.RUN_MODES.SPRITE_PRIMARY)) {
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-success");
            $(this).blur();
        }
    });

    $("#stopExecutionButton").click(function () {
        blocklyCodeManager.stopExecution();
        $("#launchCodeButton").removeClass("btn-success").addClass("btn-primary");
        //Clear sensors data a bit later to prevent last update
        setTimeout(function() {
            $(".sensors").find("input[type = text]").val("");
        }, 600);
    });

    $("#selectPortButton").click(requestPorts);
    // Set current port as name of selectPortButton
    $.ajax({
        type: 'GET',
        url: '/scratch/currentPort',
        success: function(name) {
            console.log("name = " + name);
            if (name != "") {
                $("#selectPortButton").text(name);
            } else {
                $("#selectPortButton").text(i18n.t("main.portNotChosen"));
            }
        }
    });
}

var fileReader = new FileReader();

$(document).ready(
    function () {
        var lang = getParameterByName("lang");
        if (!lang) {
            lang = defaultLang;
        }
        i18n.init({
            lng: lang,
            resGetPath: "locales/" + lang + "/translation.json"
        }, function () {
            $("#toolbox").children("category").each(function () {
                $(this).attr("name", i18n.t($(this).attr("name")));
            });
            init();
        });

        $("#programTab").click(function (e) {
            $(".blocklyToolboxDiv").css({"display": "block"});
            e.preventDefault();
            $(this).tab('show')
        });
        $("#outputTab").click(function (e) {
            $(".blocklyToolboxDiv").css({"display": "none"});
            e.preventDefault();
            $(this).tab('show')
        });

        $("#loadSketchInput").fileinput({
            language: lang,
            showPreview: false,
            allowedFileExtensions: ["blocks"]
        });

        $("#loadSketchInput").on("fileloaded", function (event, file, previewId, index, reader) {
            fileReader.onload = function (e) {
                var text = this.result;
                $("#loadSketchInput").fileinput('clear');
                var dom = Blockly.Xml.textToDom(text);
                workspace.clear();
                Blockly.Xml.domToWorkspace(workspace, dom);
                $("#loadSketchModal").modal("hide");
            };
            fileReader.readAsText(file, "UTF-8");
        });

    }
);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}