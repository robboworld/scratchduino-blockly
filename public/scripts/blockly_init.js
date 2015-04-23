/**
 * Created by xottab on 3/12/15.
 */

var curELNumber = 0;

var HASHIDS_SALT = "Windows must die";
var hashids = new Hashids(HASHIDS_SALT);
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
            {toolbox: document.getElementById('toolbox')})
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
        BlocklyStorage.backupOnUnload();


        function backup_blocks() {
            var name = prompt("Введите название для скетча");
            if(name){
                var date = new Date().valueOf();
                var id = hashids.encode(date);
                $.ajax({
                    type: 'GET',
                    url: '/addHash',
                    data:{
                        blocklyHash: id,
                        hashName: name
                    },
                    success: function(json){
                        if(typeof(Storage)!=="undefined")
                        {
                            var xml = Blockly.Xml.workspaceToDom( Blockly.mainWorkspace );
                            var txt = new XMLSerializer().serializeToString(xml);
                            localStorage.setItem(id,Blockly.Xml.domToText( xml ));
                            //console.log("backuped");
                        } else {
                            // Sorry! No web storage support..
                        }
                        alert("Success! Hash is: "+id);
                    }
                });
            }

        }

        function restore_blocks() {
            if(typeof(Storage)!=="undefined"){
                if(localStorage.data!=null){
                    var xml = Blockly.Xml.textToDom(localStorage.data);
                    alert(xml.toString());
                    //Blockly.Xml.domToWorkspace( Blockly.mainWorkspace, xml );
                    //console.log("restored");
                }
            } else {
                // Sorry! No web storage support..
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
        $("#loadProgram").click(backup_blocks);
        $("#configureRobot").click(to_configuration_page);

        $("#launchCodeButton").click(function () {

            var self = $(this);
            $("#stopExecutionButton").trigger('click');

            $.ajax({
                type: 'GET',
                url: '/scratch/on',
                contentType: 'application/json; charset=utf-8',
                success: function(message) {
                    // TODO: Response message will bw fixed
                    // TODO: What if robot not using in program?
                    if (message == "No serial port selected.") {
                        alert("Робот не настроен!");

                        return;
                    };

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

            $("#sensor1").val("");
            $("#sensor2").val("");
            $("#sensor3").val("");
            $("#sensor4").val("");
            $("#sensor5").val("");
        });
    }
);

function blocklyLoaded(blockly) {
    window.Blockly = blockly;
}