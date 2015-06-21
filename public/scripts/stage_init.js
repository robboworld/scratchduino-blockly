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
        var shadow;
        var image = new Image();
        image.onload = updateStage;
        image.src = "img/Robot_panel_mini.png";


        function init_robot(rb, name, x,y){
            resizeImg(rb, 60);
            rb.x = x;
            rb.y = y;
            rb.regX = image.naturalHeight/2;
            rb.regY = image.naturalHeight/2;
            rb.name = name;
            easelStage.addChild(rb);
        }

        function init() {
            robot = new createjs.Bitmap(image);
            init_robot(robot, "robotSprite",stageCanvas.width / 2,stageCanvas.height / 2);
            //shadow = new createjs.Bitmap(image);
            //init_robot(shadow, "shadowSprite",stageCanvas.width / 2,stageCanvas.height / 2);
            easelStage.update();
        }

        function updateStage() {
            init();
        }
    }
);