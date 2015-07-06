/**
 * Created by Pais on 07.05.2015.
 */


BlocklyCodeManager.RUN_MODES = {
    ROBOT_ONLY: 0,       //Do not use virtual robot
    SPRITE_ONLY: 1,    //Do not use real robot
    ROBOT_PRIMARY: 2,    //Use both, if real robot not response, cancel
    SPRITE_PRIMARY: 3, //Use both, if real robot not response, continue
    RECONNECTION: 4     //Use both, if real robot not response, continue and try to reconnect
};

function BlocklyCodeManager() {

    var self = this;
    var BASIC_CODE =
        "global_blockly.updateSensorsData();\n" +
        "\n";
    var generated_code = BASIC_CODE;
    var is_code_running = false;

    this.generateCode = function(workspace_code) {
        generated_code = BASIC_CODE + workspace_code;
        generated_code = processCodeMacro(generated_code);
        return generated_code;
    };

    this.getCode = function() {
        return generated_code;
    };

    //this.isCodeRunning = function() {
    //    return is_code_running;
    //};

    this.runCode = function(mode) {
        if(is_code_running) {
            self.stopExecution();
        };

        switch(mode) {
            case BlocklyCodeManager.RUN_MODES.SPRITE_ONLY:
                evalBlockly(false, mode);
                is_code_running = true;
                break;
            case BlocklyCodeManager.RUN_MODES.ROBOT_ONLY:
            case BlocklyCodeManager.RUN_MODES.ROBOT_PRIMARY:
            case BlocklyCodeManager.RUN_MODES.SPRITE_PRIMARY:
            case BlocklyCodeManager.RUN_MODES.RECONNECTION:
                $.ajax({
                    type: 'GET',
                    url: '/scratch/on',
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    success: function() {
                        evalBlockly(true, mode);
                        is_code_running = true;
                    },
                    error: function(mess) {
                        var err = JSON.parse(mess.responseText);

                        if (mode == BlocklyCodeManager.RUN_MODES.SPRITE_PRIMARY) {
                            alert(i18n.t("alert.robot_conn_virtual") + "\nError description: " + err.user);
                            evalBlockly(false, mode);
                            is_code_running = true;
                        } else if (mode == BlocklyCodeManager.RUN_MODES.RECONNECTION) {
                            alert(i18n.t("alert.robot_conn_rec") + "\nError description: " + err.user);
                            // There will be reconnection code
                            evalBlockly(true, mode);
                            is_code_running = true;
                        } else {
                            alert(i18n.t("alert.robot_conn") + err.user);
                        }
                    }
                });
                break;
            default:
                //is_code_running = false;
                break;
        }

        return is_code_running;
    };

    this.stopExecution = function() {
        if (!is_code_running) {
            return /*return message*/;
        };

        //This code clears all timeouts been created during program execution, including already executed
        while (global_blockly.main_program_timeoutIDs.length) {
            clearInterval(global_blockly.main_program_timeoutIDs.pop());
        };

        // Stop robot and close port
        global_blockly.engine("0");
        $.ajax({
            type: 'GET',
            url: '/scratch/off',
            contentType: 'application/json; charset=utf-8',
            async: false
        });

        //Delete all key listeners created in program
        global_blockly.addedEvListeners.forEach(function(elem) {
            document.removeEventListener(elem.type, elem.fun);
        });

        //Long press controller cancel.
        for (var key in global_blockly.keys_state) {
            key = global_blockly.NOT_PRESSED;
        };

        global_blockly.addedEvListeners = [];
        is_code_running = false;
    };

    function evalBlockly(robot_accessible, mode) {

        // Listen for keyUp event to prevent problems caused by long-pressed key
        global_blockly.addedEvListeners.push({type: "keyup", fun: keyUpListener});
        document.addEventListener("keyup", keyUpListener);

        global_blockly.robot_accessible = robot_accessible;
        is_code_running = true;

        window.eval(generated_code);
    };

    function keyUpListener(event) {
        if (global_blockly.keys_state[event.keyCode] != undefined) {
            global_blockly.keys_state[event.keyCode] = global_blockly.PUSHED_UP;
        }
    };

};