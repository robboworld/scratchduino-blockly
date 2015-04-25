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
var jquery = "scripts/jquery-1.11.2.min.js";
var jquery_maphighlight = "scripts/jquery.maphilight.min.js";
var blocklyInit = "scripts/blockly_init.js";
var roboEngineBlocks = "blockly_custom/blocks/robo_engine.js";
var controlsBlocks = "blockly_custom/blocks/controls.js";
var sensorsBlocks = "blockly_custom/blocks/sensors.js";
var roboEngineJsGen = "blockly_custom/generators/js/robo_engine.js";
var controlsJsGen = "blockly_custom/generators/js/controls.js";
var sensorsJsGen = "blockly_custom/generators/js/sensors.js";
var jsInterpreter = "JS-Interpreter/acorn_interpreter.js";

var modalPopover = "bootstrap/js/bootstrap-modal-popover.js";

var configReadyJs = "scripts/configuration_ready.js";
var configStylesCss = "css/configuration_styles.css";
var sensorsMenuInit = "scripts/sensors_menu_init.js";

router.get('/', function (req, res) {
    res.render('workflow',
        {
            title: 'ScratchDuino - Blockly',
            jsFiles: [
                jquery,
                jquery_maphighlight,
                bootstrapJs,
                blocklyJs,
                jsCompressedJs,
                blocksJs,
                messagesRUS,
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
                modalPopover
            ],
            cssFiles: [bootstrapCss, configStylesCss]
        });
});

var fs = require('fs');
var filename = "scratchduinoBlockly_hashes.txt";
var db;
fs.readFile(filename, function (err, data) {
    try {
        db = JSON.parse(data);
        console.log(JSON.stringify(db));
    } catch (e) {
        db = {
            hashes: [],
            sensors: []
        }
    }
});


router.get("/addHash", function (req, res) {
    var hash = req.query.blocklyHash;
    db.hashes[db.hashes.length] = {
        n: req.query.hashName,
        h: hash
    };
    saveDb(res);
});

router.get("/getAllHashes", function (req, res) {
    //res.send(JSON.stringify(db.hashes));
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
    //res.send(JSON.stringify(db.hashes));
    var pos = req.query.pos;
    var sensor = db.sensors[pos];
    if (!sensor) sensor = {};
    res.send(JSON.stringify({
        position: pos,
        sensor: sensor
    }));
});

router.get("/saveSensor", function (req, res) {
    var pos = req.query.pos;
    console.log("pos is " + pos);
    console.log("sens is " + req.query.sensor);
    var sensor = JSON.parse(req.query.sensor);
    console.log(req.query.sensor);
    db.sensors[pos] = sensor;
    saveDb(res);
});

function saveDb(res) {
    var tmp = JSON.stringify(db);
    console.log(tmp);
    fs.writeFile(filename, tmp, function (err) {
        if (err) {
            console.log(err);
            res.send("fail");
        } else {
            console.log("Файл сохранен.");
            res.send("ok");
        }
    });
}

router.get('/sensors', function(req, res) {
   res.render('sensors_tuning');
});

module.exports = router;
