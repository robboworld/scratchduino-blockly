/**
 * Created by Pais on 17.04.2015.
 */

$(document).ready(
    function() {

        // TODO: Asynchronous refreshing?
        function requestPorts() {
            $.ajax({
                type: "GET",
                url: "/scratch/ports",
                contentType: 'application/json; charset=utf-8',
                success: function(json) {
                    successPort(json);
                },
                error: function() {
                    //
                }
            });
        };

        function successPort(json) {

            var ports = JSON.parse(json);
            var portsDivider = $("#portsDivider");

            clearList();

            if (!ports.length) {
                var li = createListItem("Нет доступных портов", null);
                portsDivider.before(li);

                $("#portName").text("Не выбран");
            }

            for (var i = 0; i < ports.length; i++) {
                var li = createListItem(ports[i].name, onPortSelected);
                portsDivider.before(li);
            }

            function clearList() {
                var portsList = document.getElementById("portsList");

                // Delete all elements before divider and refresher
                for(var i = 0;  portsList.children.length - 2; i++) {
                    portsList.removeChild(portsList.children[i]);
                };
            };

            function createListItem(text, onClickFunc) {
                var li = document.createElement("li");
                var a = document.createElement("a");

                a.innerText = text;
                a.onclick = onClickFunc;
                li.appendChild(a);

                return li;
            }

            function onPortSelected() {
                var self = this;

                $("#portName").text(this.innerText);
                $.ajax({
                        type: "GET",
                        url: "scratch/set_port",
                        data: {
                            port: self.innerText
                        }
                    }
                );
            };
        };

        // TODO: action on #portName button click
        // TODO: Add image map window resizing processing (see: https://github.com/stowball/jQuery-rwdImageMaps)
        // TODO: Try to process image resizing with map
        $("#refreshPorts").click(requestPorts);
        requestPorts();
    }
);