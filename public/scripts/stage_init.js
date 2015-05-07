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

            //robot.regX = image.width/2;
            //robot.regY = image.height/2;
            robot.name = "robotSprite";
            easelStage.addChildAt(robot);
            easelStage.update();
        }

        function updateStage() {
            init();
        }
    }
);


function SpriteCodeGenerator() {

    function sprite_move(direction, timeout) {

        var rrb = easelStage.getChildByName("robotSprite");
        window.clearInterval(robotSpriteMovingInterval);
        if (direction != 0) {
            var move;
            switch (direction) {
                case 1:
                {
                    move = function(rb){
                        rb.x += 0;
                        rb.y += 5;
                    };
                    break;
                }
                case 2:
                {

                    move = function(rb){
                        rb.rotation -= 1;
                    };
                    break;
                }
                case 3:
                {

                    move = function(rb){
                        rb.rotation += 1;
                    };
                    break;
                }
                case 4:
                {

                    move = function(rb){
                        rb.x += 0;
                        rb.y += -5;
                    };
                    break;
                }
            }
            robotSpriteMovingInterval = window.setInterval(function (e) {
                var rb = easelStage.getChildByName("robotSprite");
                move(rb);
                easelStage.update();
            }, 100);
        }

    }

    var code = sprite_move.toString()+"\n"

    var generated_code = code;

    this.generateCode = function (workspace_code) {
        generated_code = code + workspace_code;
        return generated_code;
    };

    this.getCode = function () {
        return generated_code;
    }
}
