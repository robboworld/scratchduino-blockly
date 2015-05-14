/**
 * Created by root on 4/25/15.
 */


var filename = "scratchduinoBlockly_hashes.txt";
var fs = require('fs');
var db = {};


fs.readFile(filename, function (err, data) {
    try {
        db = JSON.parse(data);
        console.log("Read from file: "+JSON.stringify(db));
    } catch (e) {
        db = {
            hashes: {},
            sensors: []
        }
    }
});

exports.getDb = function(){
    console.log("Database is "+JSON.stringify(db));
    return db;
};

exports.saveDb = function(res) {
    var tmp = JSON.stringify(db);
    console.log(tmp);
    fs.writeFile(filename, tmp, function (err) {
        if (err) {
            console.log(err);
            res.send("fail");
        } else {
            console.log("Файл сохранен.");
            res.send("ok");
        }
    });
};