/**
 * Created by root on 5/7/15.
 */
function resizeImg(img, desiredWidth){
    var currentWidth = img.image.width; // Assume this is "100"
    var scale = desiredWidth/currentWidth;
    img.scaleX = scale; // Resolves to "2"
    img.scaleY = scale; // Resolves to "2"
}
var easelStage;
$(document).ready(function (e) {
        easelStage = new createjs.Stage("stageCanvas");
        var robot;
        var image = new Image();
        image.onload = updateStage;
        image.src = "img/Robot_panel_mini.png";

        function init() {
            robot = new createjs.Bitmap(image);
            robot.name = "robotSprite";
            resizeImg(robot,100);
            easelStage.addChildAt(robot);
            easelStage.update();
           /* $("body").keydown(function(e){
                var rb = easelStage.getChildByName("robotSprite");
                rb.x+=5;
                easelStage.update();
            });*/
        }
        function updateStage() {
            init();
        }
    }
);
