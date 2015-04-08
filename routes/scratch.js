/**
 * Created by Pais on 27.03.2015.
 */

var express = require("express");
var router = express.Router();
var robot = require(".././public/serialAPI/robot");

router.get("/", function(req, res) {
    res.render("scratch_panel");
});

router.get("/engine", function(req, res) {
    var direction = req.query.direction;
    robot.move(direction, res);
});

router.get("/data", function(req, res) {
    robot.data(res);
});

router.get("/on", function(req, res) {
    robot.openConn(res);
});

// Pausing doesn't enabled on win32
router.get("/pause", function(req, res) {
    //robot.pauseConn();
    //TODO: is it needed to send res into robot module?
    res.send("Not enabled");
});

// Resuming doesn't enabled on win32
router.get("/resume", function(req, res) {
    //robot.resumeConn();
    //TODO: is it needed to send res into robot module?
    res.send("Not enabled");
});

// Will delete ALL event listeners of serialport
router.get("/off", function(req, res) {
    robot.closeConn(res);
});

module.exports = router;