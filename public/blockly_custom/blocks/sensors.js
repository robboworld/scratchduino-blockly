/**
 * Created by root on 4/24/15.
 */

var db ={};

function reloadDb(){
    $.ajax({
        type: "GET",
        url: "/allSensors",
        async: false,
        success: function (data) {
            db.sensors = JSON.parse(data);
        },
        error: function () {
        }
    });
}

Blockly.Blocks['sensor_value'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Значение сенсора")
            .appendField(new Blockly.FieldDropdown([
                ["1", "sensor_1"],
                ["2", "sensor_2"],
                ["3", "sensor_3"],
                ["4", "sensor_4"],
                ["5", "sensor_5"]
            ]), "sensor_number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

Blockly.Blocks['reload_sensor_values'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
            .appendField("Обновить данные с сенсоров");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

/*

 option(value=1) Касания
 option(value=2) Света
 option(value=3) Линии
 option(value=4) Камера
* */

function getInitFunction(sensorNumber){
    return function() {
        reloadDb();
        this.setColour(20);
        this.setInputsInline(true);
        var sensor = db.sensors[sensorNumber];
        var sensorName = "в гнезде "+sensorNumber;
        if(sensor){
            if(sensor.name){
                sensorName = sensor.name;
            }
            if(sensor.active){
                switch (sensor.type) {
                    case '1':
                        this.appendDummyInput()
                            .appendField("Кнопка "+sensorName+" нажата");
                        this.setOutput(true, "Boolean");
                        break;
                    case '2':
                        this.appendDummyInput()
                            .appendField("Датчик света "+sensorName);
                        this.setOutput(true, "Boolean");
                        break;
                    case '3':
                        this.appendDummyInput()
                            .appendField("Датчик линии "+sensorName);
                        this.setOutput(true, "Boolean");
                        break;
                    case '4':
                        this.appendDummyInput()
                            .appendField("Камера "+sensorName);
                        this.setOutput(true, "Boolean");
                        break;
                    default: //TODO: Error message
                        this.appendDummyInput()
                            .appendField("Не указан тип сенсора "+sensorName);
                        break;
                }
            } else {
                this.appendDummyInput()
                    .appendField("Сенсор "+sensorName+" неактивен");
            }
        } else {
            this.appendDummyInput()
                .appendField("Сенсор в гнезде "+sensorNumber+" не указан");
        }
        this.setTooltip('');
    }
}


for(var i =1; i<=5; ++i){
    Blockly.Blocks['sensor_'+i] = {
        init: getInitFunction(i)
    };
}
