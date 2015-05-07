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
var robotSpriteMovingInterval;

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

function sprite_move(direction, timeout) {
    var rrb = easelStage.getChildByName("robotSprite");

    window.clearInterval(robotSpriteMovingInterval);
    if (direction != 0) {
        var move;
        var speed = 5;
        switch (direction) {
            case 1:
            {
                move = function(rb){
                    var angle = Math.PI*(rb.rotation+90)/180;
                    rb.x += speed*Math.cos(angle);
                    rb.y += speed*Math.sin(angle);
                };
                break;
            }
            case 2:
            {

                move = function(rb){
                    rb.rotation -= 4;
                };
                break;
            }
            case 3:
            {

                move = function(rb){
                    rb.rotation += 4;
                };
                break;
            }
            case 4:
            {

                move = function(rb){
                    var angle = Math.PI*(rb.rotation+90)/180;
                    rb.x -= speed*Math.cos(angle);
                    rb.y -= speed*Math.sin(angle);
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

/*
function SpriteCodeGenerator() {



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
*/
