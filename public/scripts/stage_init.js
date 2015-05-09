/**
 * Created by root on 5/7/15.
 */
function resizeImg(img, desiredWidth) {
    var currentWidth = img.image.width; // Assume this is "100"
    var scale = desiredWidth / currentWidth;
    img.scaleX = scale; // Resolves to "2"
    img.scaleY = scale; // Resolves to "2"
}

var easelStage;

$(document).ready(function (e) {
        var stageCanvas = document.getElementById("stageCanvas");
        stageCanvas.width = stageCanvas.offsetWidth;
        stageCanvas.height = stageCanvas.offsetHeight;
        easelStage = new createjs.Stage("stageCanvas");
        var robot;
        var image = new Image();
        image.onload = updateStage;
        image.src = "img/Robot_panel_mini.png";

        function init() {
            robot = new createjs.Bitmap(image);
            resizeImg(robot, 100);
            robot.x = stageCanvas.width / 2;
            robot.y = stageCanvas.height / 2;

            robot.regX = image.naturalHeight/2;
            robot.regY = image.naturalHeight/2;
            robot.name = "robotSprite";
            easelStage.addChildAt(robot);
            easelStage.update();
        }

        function updateStage() {
            init();
        }
    }
);