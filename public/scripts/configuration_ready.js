/**
 * Created by Pais on 17.04.2015.
 */





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

    $.ajax({
        type: "GET",
        url: "/sensorSettings",
        data: {
            pos: pos//todo check if number already exists
        },
        success: function (data) {
            var sensorData = JSON.parse(data).sensor;
            if (sensorData) {
                if (sensorData.active) {
                    $("#isActive").prop("checked", true);
                }
                if (sensorData.number) {
                    $("#selectedNumber").find("option[value="+sensorData.number+"]").prop('selected', true);
                }
                if (sensorData.name) {
                    $("#selectedName").val(sensorData.name);
                }
                if (sensorData.type) {
                    $("#selectedType").find("option[value="+sensorData.type+"]").prop('selected', true);
                }
            }
            $("#positionDiv").html(pos);
            $("#sensorEditCollapse").collapse('show');
        },
        error: function () {
        }
    });
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
            $.ajax({
                type: "GET",
                url: "/saveSensor",
                data: {
                    pos: $("#positionDiv").html(),
                    sensor: JSON.stringify(sens)
                },
                success: function (data) {
                    btn.removeClass("btn-primary");
                    btn.addClass("btn-success");
                    btn.html("Сохранено!");
                },
                error: function () {
                    btn.removeClass("btn-primary");
                    btn.removeClass("btn-success");
                    btn.addClass("btn-danger");
                    btn.html("Ошибка :(");
                }
            });
        });

        function requestPorts() {
            $.ajax({
                type: "GET",
                url: "/scratch/ports",
                contentType: 'application/json; charset=utf-8',
                success: function (json) {
                    successPort(json);
                },
                error: function () {
                    alert("Ошибка при поиске доступных портов");
                }
            });
        };

        function successPort(json) {

            var ports = JSON.parse(json);
            var portsDivider = $("#portsDivider");
            var self = this;

            /*Clear list*/
            var portsList = document.getElementById("portsList");
            for (var i = 0; portsList.children.length - 2; i++) {
                portsList.removeChild(portsList.children[i]);
            };

            if (!ports.length) {
                portsDivider.before(createListItem("Нет доступных портов", null));
                $("#portName").text("Не выбран");
            }

            for (i = 0; i < ports.length; i++) {
                var li = createListItem(ports[i].name, function() {
                    $.ajax({
                        type: "GET",
                        url: "scratch/set_port",
                        data: {
                            port: self.innerText
                        },
                        success: function () {
                            $("#portName").text(self.innerText);
                        },
                        error: function () {
                            alert("Не удалось подключиться к устройству");
                        }
                    });
                });

                portsDivider.before(li);
            }

            function createListItem(text, onClickFunc) {
                var li = document.createElement("li");
                var a = document.createElement("a");

                a.innerText = text;
                a.onclick = onClickFunc;
                li.appendChild(a);

                return li;
            }
        };

        // TODO: action on #portName button click
        // TODO: Add image map window resizing processing (see: https://github.com/stowball/jQuery-rwdImageMaps)
        // TODO: Try to process image resizing with map
        $("#refreshPorts").click(requestPorts);
        $("#portsDownSpan").click(requestPorts);
        requestPorts();
    }
);