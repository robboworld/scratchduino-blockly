/**
 * Created by Pais on 27.03.2015.
 */

var express = require("express");
var router = express.Router();
var robot = require(".././public/serialAPI/robot");

router.get("/engine", function(req, res) {
    var direction = req.query.direction;
    res.send("engine " + direction);
    robot.move(direction);
});

router.get("/sensors", function(req, res) {
    var number = req.query.number;
    res.send("sensor " + number);
    robot.sensor(number);
});

router.get("/on", function(req, res) {
    res.send("on");
    robot.on();
});

router.get("/off", function(req, res) {
    res.send("off");
    robot.off();
});

module.exports = router;