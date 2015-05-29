/**
 * Created by Pais on 09.05.2015.
 */

var robotSpriteMovingInterval = null;

function sprite_interface() {

}

sprite_interface.moveInterval = null;
sprite_interface.SPEED = 5;
sprite_interface.moveFunc = null;


sprite_interface.setDirection = function (direction) {
    switch (direction) {
        case 1:
        {
            sprite_interface.moveFunc = function (rb) {
                var angle = Math.PI * (rb.rotation + 90) / 180;
                rb.x += sprite_interface.SPEED * Math.cos(angle);
                rb.y += sprite_interface.SPEED * Math.sin(angle);
            };
            break;
        }
        case 2:
        {
            sprite_interface.moveFunc = function (rb) {
                rb.rotation -= 4;
            };
            break;
        }
        case 3:
        {
            sprite_interface.moveFunc = function (rb) {
                rb.rotation += 4;
            };
            break;
        }
        case 4:
        {
            sprite_interface.moveFunc = function (rb) {
                var angle = Math.PI * (rb.rotation + 90) / 180;
                rb.x -= sprite_interface.SPEED * Math.cos(angle);
                rb.y -= sprite_interface.SPEED * Math.sin(angle);
            };
            break;
        }
        default:
            break;
    }
}

var shadow_shown = false;
var rb;
var shadow;
sprite_interface.move = function (mode) {

    clearInterval(sprite_interface.moveInterval);

    switch (mode) {
        case "0":
            clearInterval(sprite_interface.moveInterval);
            break;
        case "5":
            sprite_interface.moveInterval = window.setInterval(function (e) {
                rb = easelStage.getChildByName("robotSprite");
                //shadow = easelStage.getChildByName("shadowSprite");
                sprite_interface.moveFunc(rb);
                var stageCanvas = document.getElementById("stageCanvas");
                var w = stageCanvas.width;
                var h = stageCanvas.height;
                rb.x = (rb.x+ w)%w;
                rb.y = (rb.y+ h)%h;
                easelStage.update();
            }, 100);
            break;
        default:
            break;
    }
};