/**
 * Created by Pais on 27.03.2015.
 */

var express = require("express");
var router = express.Router();
var robot = require(".././public/serial/robot");

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

router.get("/off", function(req, res) {
    robot.closeConn(res);
});

router.get("/ports", function(req, res) {
    robot.findPorts(res);
});

router.get("/set_port", function(req, res) {
    var portName = req.query.port;
    robot.setPort(portName);

    //TODO: response message
    res.send("OK");
});

module.exports = router;