/**
 * Created by xottab on 3/27/15.
 */


Blockly.Blocks['when_key_pressed'] = {
    init: function () {
        function t(arg){
            return i18n.t("blockly.toolbox.controls.when_key_pressed."+arg);
        }
        this.setColour(65);
        this.appendDummyInput()
            .appendField(t("when_key"));
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [
                    [t("arrow_up"), "38"],
                    [t("arrow_down"), "40"],
                    [t("arrow_left"), "37"],
                    [t("arrow_right"), "39"],
                    [t("space"), "32"],
                    [t("enter"), "13"],
                    ["0", "48"],
                    ["1", "49"],
                    ["2", "50"],
                    ["3", "51"],
                    ["4", "52"],
                    ["5", "53"],
                    ["6", "54"],
                    ["7", "55"],
                    ["8", "56"],
                    ["9", "57"],
                    //["a", "65"],
                    //["b", "66"],
                    //["c", "67"],
                    //["d", "68"],
                    //["e", "69"],
                    //["f", "70"],
                    //["g", "71"],
                    //["h", "72"],
                    //["i", "73"],
                    //["j", "74"],
                    //["k", "75"],
                    //["l", "76"],
                    //["m", "77"],
                    //["n", "78"],
                    //["o", "79"],
                    //["p", "80"],
                    //["q", "81"],
                    //["r", "82"],
                    //["s", "83"],
                    //["t", "84"],
                    //["u", "85"],
                    //["v", "86"],
                    //["w", "87"],
                    //["x", "88"],
                    //["y", "89"],
                    //["z", "90"]
                ]), "key");
        this.appendDummyInput()
            .appendField(t("is_pressed"));
        this.appendStatementInput("action");
        this.setInputsInline(true);
    }
};

Blockly.Blocks['while_program_running'] = {
    init: function () {
        function t(arg){
            return i18n.t("blockly.toolbox.controls.while_program_running."+arg);
        }
        this.setColour(65);
        this.appendDummyInput()
            .appendField(t("while_program_is_running"));
        this.appendStatementInput("action");
        this.setInputsInline(true);
    }
};

Blockly.Blocks['pause'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(i18n.t("blockly.toolbox.controls.pause.pause_on"));
        this.appendValueInput("time")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(i18n.t("blockly.toolbox.controls.pause.sec"));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl("https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e7tpgk");
    }
};

/* Code of IF block corrected to exclude else-if mutator in case of simplicity
* of processed JS code*/
Blockly.Blocks['controls_if'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendValueInput('IF0')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput('DO0')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator([
            'controls_if_else']));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            if (!thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
            }
            return '';
        });
        this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        if (this.elseCount_) {
            var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
            this.removeInput('ELSE');
        }
        this.elseCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_else':
                    this.elseCount_++;
                    var elseInput = this.appendStatementInput('ELSE');
                    elseInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
                    // Reconnect any child blocks.
                    if (clauseBlock.statementConnection_) {
                        elseInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
            clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
            clauseBlock.nextConnection.targetBlock();
        }
    }
};

Blockly.Blocks['controls_if_if'] = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['controls_if_else'] = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};