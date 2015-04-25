/**
 * Created by Paise on 24.04.2015.
 */

var robot = require("./robot");

var RECONN_INTERVAL = 500;
var DISCONN_TIMEOUT = 200;
var CONN_TIMEOUT = 2500;

var connectionWatcher = {
    trigger: false,
    isWatching: false,
    waitDisconnetcion: function(responseKeeper, sp) {
        var self = this;

        if (this.isWatching) return;
        this.trigger = false;
        this.isWatching = true;

        setTimeout(function() {
            if (!self.trigger) {
                sp.close(function(err) {
                    console.log("Closed by disconnection");
                });
                if (responseKeeper.isActivated()) {
                    responseKeeper.send("Disconnected", 500);
                }
                var intervalID = setInterval(function() {
                    reconnectPort(intervalID, sp);
                }, RECONN_INTERVAL);
            } else {
                self.trigger = false;
            }
            self.isWatching = false;
        }, DISCONN_TIMEOUT);
    },
    waitPort: function(responseKeeper) {
        var self = this;

        if (this.isWatching) return;
        this.trigger = false;
        this.isWatching = true;

        setTimeout(function() {
            if (!self.trigger) {
                if (responseKeeper.isActivated()) {
                    responseKeeper.send("Disconnected", 500);
                }
            } else {
                self.trigger = false;
            }
            self.isWatching = false;
        }, CONN_TIMEOUT);
    }
};

var reconnectionCounter = 0;
var RECONNECTION_ATTEMPTS = 20;

function reconnectPort(intervalID, sp) {
    if (reconnectionCounter++ < RECONNECTION_ATTEMPTS && !sp.isOpen()) {
        console.log("attempt");
        robot.openConn(null);
    } else {
        clearInterval(intervalID);
    }
};

module.exports = connectionWatcher;