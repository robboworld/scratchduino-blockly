var express = require('express');
var router = express.Router();

/* GET home page. */
var bootstrapCss = "bootstrap/css/bootstrap.min.css";
var bootstrapJs = "bootstrap/js/bootstrap.min.js";
var blocklyJs = "blockly/blockly_compressed.js";
var jsCompressedJs = "blockly/javascript_compressed.js";
var blocksJs = "blockly/blocks_compressed.js";
var messagesRUS = "blockly/msg/js/ru.js";
var messagesEN = "blockly/msg/js/en.js";
var jquery = "scripts/jquery-1.11.2.min.js";
var blocklyInit = "scripts/blockly_init.js";
var roboEngineBlocks = "blockly_custom/blocks/robo_engine.js";
var controlsBlocks = "blockly_custom/blocks/controls.js";
var roboEngineJsGen = "blockly_custom/generators/js/robo_engine.js";
var controlsJsGen = "blockly_custom/generators/js/controls.js";
var jsInterpreter = "JS-Interpreter/acorn_interpreter.js";

router.get('/', function (req, res) {
    res.render('workflow',
        {
            title: 'Express',
            jsFiles: [
                jquery,
                bootstrapJs,
                blocklyJs,
                jsCompressedJs,
                blocksJs,
                messagesRUS,
                blocklyInit,
                roboEngineBlocks,
                controlsBlocks,
                roboEngineJsGen,
                controlsJsGen,
                jsInterpreter
            ],
            cssFiles: [bootstrapCss]
        });
});

module.exports = router;
