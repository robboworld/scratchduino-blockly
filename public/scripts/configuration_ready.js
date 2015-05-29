/**
 * Created by Pais on 17.04.2015.
 */



var sensorsStorageID = "OLOLO#UNIQUE_ID#SENSORS#aflfkl";

function loadSensorData(pos) {
    $("#isActive").prop("checked", false);
    $("#selectedNumber").find("option[value=0]").prop('selected', true);
    $("#selectedType").find("option[value=0]").prop('selected', true);
    $("#selectedName").val("");
    var btn = $("#saveSensorButton");
    btn.removeClass("btn-success");
    btn.removeClass("btn-danger");
    btn.addClass("btn-primary");
    btn.html("Сохранить");

    if (typeof(Storage) !== "undefined") {
        var data = localStorage.getItem(sensorsStorageID);
        var sensorData = JSON.parse(data)[pos];

        if (sensorData) {
            if (sensorData.active) {
                $("#isActive").prop("checked", true);
            }
            if (sensorData.number) {
                $("#selectedNumber").find("option[value=" + sensorData.number + "]").prop('selected', true);
            }
            if (sensorData.name) {
                $("#selectedName").val(sensorData.name);
            }
            if (sensorData.type) {
                $("#selectedType").find("option[value=" + sensorData.type + "]").prop('selected', true);
            }
        }
        $("#positionDiv").html(pos);
        $("#sensorEditCollapse").collapse('show');
    } else {
        alert("Sorry, no local storage available");
    }
}

$(document).ready(
    function () {
        $("#robot_image").maphilight();
        var areas = $(".popoverArea");
        var collapse = $('#sensorEditCollapse');
        collapse.collapse({
            toggle: false
        });
        var isShown = false;

        $('html').click(function () {
            if (isShown) {
                collapse.collapse('hide');
                collapse.on('hidden.bs.collapse', function () {
                    isShown = false;
                    collapse.off('hidden.bs.collapse');
                });
            }
        });

        collapse.click(function (e) {
            e.stopPropagation();
        });



        areas.each(function (index) {
            var $this = $(this);
            $this.click(function (e) {
                e.stopPropagation();
                if (isShown) {
                    collapse.collapse('hide');
                    isShown = false;
                    collapse.on('hidden.bs.collapse', function () {
                        loadSensorData($this.attr("data-position"));
                        collapse.collapse('show');
                        isShown = false;
                        collapse.off('hidden.bs.collapse');
                    });
                } else {
                    isShown = true;
                    loadSensorData($this.attr("data-position"));
                    collapse.collapse('show');
                    collapse.on('shown.bs.collapse', function () {
                        isShown = true;
                        collapse.off('shown.bs.collapse');
                    });
                }
            });
        });

        $("#saveSensorButton").click(function (e) {
            var btn = $("#saveSensorButton");
            var sens = {
                active: $("#isActive").is(":checked"),
                number: $("#selectedNumber").val(),
                name: $("#selectedName").val(),
                type: $("#selectedType").val()
            };
            if (typeof(Storage) !== "undefined") {
                var data = localStorage.getItem(sensorsStorageID);
                var sensors = JSON.parse(data);
                if(!sensors) sensors = [];
                sensors[$("#positionDiv").html()] = sens;
                localStorage.setItem(sensorsStorageID,JSON.stringify(sensors));
                btn.removeClass("btn-primary");
                btn.addClass("btn-success");
                btn.html("Сохранено!");
            } else {
                alert("Sorry, no local storage available");
            }
        });
        // TODO: Add image map window resizing processing (see: https://github.com/stowball/jQuery-rwdImageMaps)
        // TODO: Try to process image resizing with map
    }
);