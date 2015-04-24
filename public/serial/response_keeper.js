/**
 * Created by Pais on 24.04.2015.
 */

var default_message = "OK";
var default_status = 200;

// TODO: Another way to process multiple responses
function ResponseKeeper() {
    this.result = [];
    this.message = default_message;
    this.status = default_status;
    self = this;

    this.addResponse = function(res) {
        self.result.push(res);
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
        self.result.shift();
        self.message = default_message;
        self.status = default_status;
    };
    this.send = function(mess, status) {
        if (!self.result)
            return;

        self.message = (mess) ? mess : self.message;
        self.status = (status) ? status : self.status;

        self.result[0].status(self.status).send(self.message);

        self.resetData();
    };
};

module.exports = new ResponseKeeper();