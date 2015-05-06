/**
 * Created by root on 4/24/15.
 */
Blockly.JavaScript['sensor_value'] = function(block) {
    var sensorID = block.getFieldValue('sensor_number');
    var code = "document.getElementById(\"" + sensorID + "\").value"
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

var BUTTON_THRESHOLD = 250;
Blockly.JavaScript['button_pushed'] = function(block) {
    var sensorID = block.getFieldValue('sensor_number');
    var code = "(document.getElementById(\"" + sensorID + "\").value > " + BUTTON_THRESHOLD + ")"
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['reload_sensor_values'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "$.ajax({\n"+
        "type: 'GET',\n"+
        "url: '/scratch/data',\n"+
        "success: function(json){" +
        "var o = JSON.parse(json);"+
        "document.getElementById(\"sensor1\").value = o[\"sensor_1\"];"+
        "document.getElementById(\"sensor2\").value = o[\"sensor_2\"];"+
        "document.getElementById(\"sensor3\").value = o[\"sensor_3\"];"+
        "document.getElementById(\"sensor4\").value = o[\"sensor_4\"];"+
        "document.getElementById(\"sensor5\").value = o[\"sensor_5\"];"+
        "}\n"+
        "});";
    return code;
};