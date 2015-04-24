/**
 * Created by Pais on 17.04.2015.
 */

var express = require("express");
var router = express.Router();

var bootstrapCss = "bootstrap/css/bootstrap.min.css";
var bootstrapJs = "bootstrap/js/bootstrap.min.js";
var main_script = "scripts/configuration_script"
var jquery = "scripts/jquery-1.11.2.min.js";

router.get("/", function(req, res) {
    res.render("configuration_panel");
    //    , {
    //    title: "Configuration",
    //    jsFiles: [
    //        jquery,
    //        main_script
    //        bootstrapJs,
    //    ],
    //    cssFiles: [
    //        bootstrapCss
    //    ]
    //});
});


module.exports = router;