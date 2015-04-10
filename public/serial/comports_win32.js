/**
 * Created by Pais on 10.04.2015.
 */

var SerialPort = require("serialport").SerialPort;
var EventEmitter = require("events").EventEmitter;
var util = require("util");

// TODO: Detect users OS.
var template = "\\\\.\\COM";

function Searcher() {
    this.PORTS_NUMBER = 127;
    this.list = [];
    var ourInstance = this;

    this.search = function() {
        var ports_checked = 0;

        for (var i = 1; i <= ourInstance.PORTS_NUMBER; i++) {
            var portname = template + i;
            var serialport = new SerialPort(portname, {});

            serialport.on("error", function(err) {
                //console.log(err);

                emitComplete();
            });

            serialport.on("open", function (err) {

                if (err === undefined) {
                    ourInstance.list.push(this.path);
                    this.close();
                }

                emitComplete();
            });
        };

        function emitComplete() {
            if (++ports_checked == ourInstance.PORTS_NUMBER) {
                ourInstance.emit("complete");
            };
        };
    };
};

util.inherits(Searcher, EventEmitter);

module.exports = new Searcher();