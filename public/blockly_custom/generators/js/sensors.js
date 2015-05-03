/**
 * Created by root on 4/24/15.
 */
Blockly.JavaScript['sensor_value'] = function(block) {
    var dropdown_sensor_number = block.getFieldValue('sensor_number');
    // TODO: Assemble JavaScript into code variable.
    var code = '' +
        '(function(){\
        var result;\
        $.ajax({\
    type: "GET",\
        url: "/scratch/data",\
        async:false,\
        contentType: \'application/json; charset=utf-8\',\
        success: function(json) {\
        var sensors = JSON.parse(json);\
        var foundNum = '+dropdown_sensor_number+';\
        result = parseInt(sensors[foundNum]);\
    },\
})\
alert(result);\
return result;\
})()';
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

for(var i = 1;i<=5;++i){
    var sensorNumber = i;

    Blockly.JavaScript['sensor_'+sensorNumber] = function(block) {
        var code = '...';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
}

