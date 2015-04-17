/**
 * Created by Pais on 17.04.2015.
 */

$(document).ready(
    function() {

        // TODO: Asynchronous refreshing?
        // TODO: Add list refreshing
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

            clearList();

            for (var i = 0; i < ports.length; i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.innerText = ports[i].name;
                a.onclick = onPortSelected;
                li.appendChild(a);
                $("#divider").before(li);
            }

            function clearList() {
                var portsList = document.getElementById("portsList");

                // Delete all elements before divider and refresher
                for(var i = 0;  portsList.children.length - 2; i++) {
                    portsList.removeChild(portsList.children[i]);
                };
            };

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

        $("#refreshPorts").click(requestPorts);
        requestPorts();
    }
);