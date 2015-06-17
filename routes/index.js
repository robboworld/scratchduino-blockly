var express = require('express');
var router = express.Router();

/*JAVASCRIPTS*/
//PLUGINS
var jquery = "plugins/jquery-1.11.2.min.js";
var createJs = "plugins/createjs.min.js";
var jquery_maphighlight = "plugins/jquery.maphilight.min.js";
var fileInputCss = "plugins/fileinput/fileinput.min.css";
var fileInputJs = "plugins/fileinput/fileinput.min.js";
var fileSaverJs = "plugins/FileSaver.min.js";
//MAIN PAGE SCRIPTS
var configReadyJs = "scripts/configuration_ready.js";
var blocklyInit = "scripts/blockly_init.js";
var stageInit = "scripts/stage_init.js";
//BLOCKLY CUSTOM BLOCKS
var roboEngineBlocks = "blockly_custom/blocks/robo_engine.js";
var controlsBlocks = "blockly_custom/blocks/controls.js";
var sensorsBlocks = "blockly_custom/blocks/sensors.js";
var roboEngineJsGen = "blockly_custom/generators/js/robo_engine.js";
var controlsJsGen = "blockly_custom/generators/js/controls.js";
var sensorsJsGen = "blockly_custom/generators/js/sensors.js";
//BLOCKLY MAIN SCRIPTS
var blocklyJs = "blockly/blockly_compressed.js";
var jsCompressedJs = "blockly/javascript_compressed.js";
var blocksJs = "blockly/blocks_compressed.js";
var storageJs = "blockly/appengine/storage.js";
//BLOCKLY CODE GENERATOR MODULES
var blocklyCodeGen = "scripts/blockly_code_manager.js";
var globalBlockly = "scripts/global_blockly.js";
var robotInterface = "scripts/robot_interface.js";
var spriteInterface = "scripts/sprite_interface.js";
var codePreprocessor = "scripts/code_preprocessor.js";
var bootBox = "plugins/bootbox.min.js";
//I18N SCRIPTS
var i18nLocal = "/i18next/i18next.js";
var messages = {
    "ru": "blockly/msg/js/ru.js",
    "en": "blockly/msg/js/en.js"
};
//BOOTSTRAP
var bootstrapJs = "bootstrap/js/bootstrap.min.js";
var modalPopover = "bootstrap/js/bootstrap-modal-popover.js";

/*CSS*/
var configStylesCss = "css/configuration_styles.css";
var flagsCss = "flags/css/flag-icon.min.css";
var bootstrapCss = "bootstrap/css/bootstrap.min.css";

var langs = ["ru", "en"];
var defaultLang = "ru";

function getFileInputLang(lang) {
    return "plugins/fileinput/fileinput_locale_" + lang + ".js";
}

router.get('/', function (req, res) {

    var lang = req.query.lang;
    if (!lang) {
        lang = defaultLang;
    }

    var blocklyLangFile = "blockly/msg/js/" + lang + ".js";
    res.render('workflow',
        {
            title: 'ScratchDuino - Blockly',
            jsFiles: [
                jquery,
                i18nLocal,
                jquery_maphighlight,
                bootstrapJs,
                bootBox,
                fileInputJs,
                getFileInputLang(lang),
                fileSaverJs,
                blocklyJs,
                createJs,
                jsCompressedJs,
                blocksJs,
                blocklyLangFile,
                messages[lang],
                stageInit,
                blocklyInit,
                roboEngineBlocks,
                controlsBlocks,
                sensorsBlocks,
                roboEngineJsGen,
                controlsJsGen,
                sensorsJsGen,
                storageJs,
                configReadyJs,
                modalPopover,
                blocklyCodeGen,
                globalBlockly,
                robotInterface,
                spriteInterface,
                codePreprocessor
            ],
            cssFiles: [bootstrapCss, fileInputCss,configStylesCss, flagsCss],
            lang: lang,
            langs: langs
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

router.get('/sensors', function (req, res) {
    res.render('sensors_tuning');
});

module.exports = router;
