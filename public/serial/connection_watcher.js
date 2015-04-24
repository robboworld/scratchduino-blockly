/**
 * Created by Paise on 24.04.2015.
 */

var robot = require("./robot");

var RECONN_INTERVAL = 500;
var DISCONN_TIMEOUT = 200;

var connectionWatcher = {
    dataSendingComplete: false,
    isWatching: false,
    waitForData: function(responseKeeper, sp) {
        var self = this;

        if (this.isWatching) return;
        this.dataSendingComplete = false;
        this.isWatching = true;

        setTimeout(function() {
            if (!self.dataSendingComplete) {
                sp.close(function(err) {
                    console.log("Closed by disconnection");
                });
                if (responseKeeper.isActivated()) {
                    responseKeeper.send("Disconnected", 500);
                }
                var intervalID = setInterval(function() {
                    reconnectPort(intervalID);
                }, RECONN_INTERVAL);
            } else {
                self.dataSendingComplete = false;
            }
            self.isWatching = false;
        }, DISCONN_TIMEOUT);
    }
};

var reconnectionCounter = 0;
var RECONNECTION_ATTEMPTS = 20;

function reconnectPort(intervalID) {
    if (reconnectionCounter++ < RECONNECTION_ATTEMPTS && !serialport.isOpen()) {
        robot.openConn(null);
    } else {
        clearInterval(intervalID);
    }
};

module.exports = connectionWatcher;