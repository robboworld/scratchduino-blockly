/**
 * Created by xottab on 3/12/15.
 */


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

    li.innerText = "Загрузка ";
    span.className = "glyphicon glyphicon-refresh glyphicon-refresh-animate";
    li.appendChild(span);
    $("#portsList").append(li);

};

function successPort(json) {

    var ports = JSON.parse(json);
    var $portsList = $("#portsList");

    $portsList.empty();

    if (!ports.length) {
        var li = createListItem("Нет доступных портов", null);
        $portsList.append(li);

        $("#selectPortButton").text("Порт не выбран");
        // TODO: send to server or cancel port selection
    }

    for (var i = 0; i < ports.length; i++) {
        var li = createListItem(ports[i].name, onPortSelected);
        $portsList.append(li);
    }

    function createListItem(text, onClickFunc) {
        var li = document.createElement("li");
        var a = document.createElement("a");

        a.innerText = text;
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
    };
};

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

    Blockly.inject(document.getElementById('blocklyDiv'),
        {toolbox: document.getElementById('toolbox')})

    function myUpdateFunction() {
        blocklyCodeManager.generateCode(Blockly.JavaScript.workspaceToCode());
        document.getElementById('jsOutput').value = blocklyCodeManager.getCode();
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
                var deleteButtons = $(".deleteSketchButton");
                deleteButtons.each(function () {
                    $(this).click(function (e) {
                        e.stopPropagation();
                        var row = $(this).parents("tr");
                        var hash = row.children(".hash").text();
                        if (confirm("Вы уверены, что хотите удалить " + hash + " ?")) {
                            $.ajax({
                                type: 'GET',
                                url: '/deleteHash',
                                data: {blocklyHash: hash},
                                success: function () {
                                    row.remove();
                                }
                            });
                        }
                    });
                });
                modal.modal("toggle")
            },
            error: function () {
                alert("Sorry, cannot load list of sketches");
            }
        });

    });

    $("#configureRobot").click(to_configuration_page);

    $("#launchCodeButton").click(function () {

        if (blocklyCodeManager.runCode(BlocklyCodeManager.RUN_MODES.SPRITE_PRIMARY)) {
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-success");
            $(this).blur();
        }
    });

    $("#stopExecutionButton").click(function () {

        window.clearInterval(robotSpriteMovingInterval);

        blocklyCodeManager.stopExecution();

        $("#launchCodeButton").removeClass("btn-success");
        $("#launchCodeButton").addClass("btn-primary");
        $(".sensors").find("input[type = text]").val("");
    });

    $("#selectPortButton").click(requestPorts);

}

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

    }
);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}