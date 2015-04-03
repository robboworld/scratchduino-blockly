/**
 * Created by Pais on 27.03.2015.
 */

var express = require("express");
var router = express.Router();
var robot = require(".././public/serialAPI/robot");

router.get("/engine", function(req, res) {
    var direction = req.query.direction;
    robot.move(direction);
    res.send("engine " + direction);
});

router.get("/data", function(req, res) {
    robot.data(res);
});

router.get("/on", function(req, res) {
    robot.on();
    res.send("on");
});

router.get("/off", function(req, res) {
    robot.off();
    res.send("off");
});

module.exports = router;