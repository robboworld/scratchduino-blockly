var express = require('express');
var router = express.Router();

/* GET home page. */
var bootstrapCss = "bootstrap/css/bootstrap.min.css";
var bootstrapJs = "bootstrap/js/bootstrap.min.js";
var blocklyJs = "blockly/blockly_compressed.js";
var jsCompressedJs = "blockly/javascript_compressed.js";
var blocksJs = "blockly/blocks_compressed.js";
var storageJs = "blockly/appengine/storage.js";
var messagesRUS = "blockly/msg/js/ru.js";
var messagesEN = "blockly/msg/js/en.js";
var jquery = "plugins/jquery-1.11.2.min.js";
var createJs = "plugins/createjs.min.js";
var jquery_maphighlight = "plugins/jquery.maphilight.min.js";
var blocklyInit = "scripts/blockly_init.js";
var stageInit = "scripts/stage_init.js";
var roboEngineBlocks = "blockly_custom/blocks/robo_engine.js";
var controlsBlocks = "blockly_custom/blocks/controls.js";
var sensorsBlocks = "blockly_custom/blocks/sensors.js";
var roboEngineJsGen = "blockly_custom/generators/js/robo_engine.js";
var controlsJsGen = "blockly_custom/generators/js/controls.js";
var sensorsJsGen = "blockly_custom/generators/js/sensors.js";
var jsInterpreter = "JS-Interpreter/acorn_interpreter.js";
var blocklyCodeGen = "scripts/blockly_code_manager.js";
var globalBlockly = "scripts/global_blockly.js";
var robotInterface = "scripts/robot_interface.js";
var spriteInterface = "scripts/sprite_interface.js";
var flagsCss = "flags/css/flag-icon.min.css";

var modalPopover = "bootstrap/js/bootstrap-modal-popover.js";

var configReadyJs = "scripts/configuration_ready.js";
var configStylesCss = "css/configuration_styles.css";

var i18nLocal = "/i18next/i18next.js";

var langs = ["ru", "en"];
var defaultLang = "ru";

router.get('/', function (req, res) {

    var lang = req.query.lang;
    if(!lang){
        lang = defaultLang;
    }

    var blocklyLangFile = "blockly/msg/js/"+lang+".js";

    res.render('workflow',
        {
            title: 'ScratchDuino - Blockly',
            jsFiles: [
                jquery,
                i18nLocal,
                jquery_maphighlight,
                bootstrapJs,
                blocklyJs,
                createJs,
                jsCompressedJs,
                blocksJs,
                blocklyLangFile,
                messagesRUS,
                stageInit,
                blocklyInit,
                roboEngineBlocks,
                controlsBlocks,
                sensorsBlocks,
                roboEngineJsGen,
                controlsJsGen,
                sensorsJsGen,
                jsInterpreter,
                storageJs,
                configReadyJs,
                modalPopover,
                blocklyCodeGen,
                globalBlockly,
                robotInterface,
                spriteInterface
            ],
            cssFiles: [bootstrapCss, configStylesCss, flagsCss],
            lang: lang,
            langs: langs
        });
});

var my_database = require('../public/scripts/scratchduino_db');
var db;

function updateDb() {
    db = my_database.getDb();
}
router.get("/addHash", function (req, res) {
    updateDb();
    var hash = req.query.blocklyHash;
    db.hashes[db.hashes.length] = {
        n: req.query.hashName,
        h: hash
    };
    my_database.saveDb(res);
});

router.get("/getAllHashes", function (req, res) {
    //res.send(JSON.stringify(db.hashes));
    updateDb();
    res.render('sketch_list',
        {
            hashes: db.hashes
        });
});


router.get('/demo', function (req, res) {
    res.render('demo',
        {
            title: 'Express',
            jsFiles: [
                jquery,
                bootstrapJs
            ],
            cssFiles: [bootstrapCss]
        });
});

router.get("/sensorSettings", function (req, res) {
    updateDb();
    //res.send(JSON.stringify(db.hashes));
    var pos = req.query.pos;
    var sensor = db.sensors[pos];
    if (!sensor) sensor = {};
    res.send(JSON.stringify({
        position: pos,
        sensor: sensor
    }));
});

router.get("/allSensors", function (req, res) {
    updateDb();
    res.send(JSON.stringify(db.sensors));
});

router.get("/saveSensor", function (req, res) {
    updateDb();
    var pos = req.query.pos;
    db.sensors[pos] = JSON.parse(req.query.sensor);
    my_database.saveDb(res);
});


router.get('/sensors', function (req, res) {
    res.render('sensors_tuning');
});

module.exports = router;
