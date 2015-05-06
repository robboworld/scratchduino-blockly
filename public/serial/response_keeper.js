/**
 * Created by Pais on 24.04.2015.
 */

function ResponseKeeper() {
    this.result = null;
    this.message = "OK";
    this.status = 200;
    var self = this;

    this.addResponse = function(res) {
        if (res == null) return false;

        // If there is another awaiting connection, skip new request
        if (self.result != null) {
            res.status(500).send("Too early");
            return false;
        };

        self.result = res;
        return true;
    };

    this.isActivated = function() {
        return !(!self.result); // To boolean
    };

    this.resetData = function() {
        self.result = null;
        self.message = "OK";
        self.status = 200;
    };

    this.send = function(mess, status) {
        if (self.result == null)
            return;

        if (self.result.headersSent) {
            self.resetData();
            return;
        }

        self.message = (mess) ? mess : self.message;
        self.status = (status) ? status : self.status;

        self.result.status(self.status).send(self.message);

        self.resetData();
    };
};

module.exports = new ResponseKeeper();