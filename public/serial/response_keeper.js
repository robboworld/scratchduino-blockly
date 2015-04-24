/**
 * Created by Pais on 24.04.2015.
 */

var default_message = "OK";
var default_status = 200;

// TODO: Another way to process multiple responses
function ResponseKeeper() {
    this.result = null;
    this.message = default_message;
    this.status = default_status;
    self = this;

    this.addResponse = function(res) {
        if (res == null) return;

        // If there is another awaiting connection, skip current
        if (self.result == null) {
            res.status(500).send("Too early");
        };

        self.result = res;
    };
    this.setStatus = function(status) {
        self.status = status;
    };
    this.isActivated = function() {
        return !(!self.result.length); // To boolean
    };
    this.appendMessage = function(mess) {
        self.message += mess;
    };
    this.resetData = function() {
        self.result = null;
        self.message = default_message;
        self.status = default_status;
    };
    this.send = function(mess, status) {
        if (self.result == null)
            return;

        self.message = (mess) ? mess : self.message;
        self.status = (status) ? status : self.status;

        self.result.status(self.status).send(self.message);

        self.resetData();
    };
};

module.exports = new ResponseKeeper();