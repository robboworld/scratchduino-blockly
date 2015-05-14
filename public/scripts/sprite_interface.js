/**
 * Created by Pais on 09.05.2015.
 */

var robotSpriteMovingInterval = null;

function sprite_interface() {

}

sprite_interface.move = function (direction, timeout) {
    var rrb = easelStage.getChildByName("robotSprite");

    window.clearInterval(robotSpriteMovingInterval);
    var move;
    var speed = 5;

    /*Set move function*/
    switch (direction) {
        case 1:
        {
            move = function (rb) {
                var angle = Math.PI * (rb.rotation + 90) / 180;
                rb.x += speed * Math.cos(angle);
                rb.y += speed * Math.sin(angle);
            };
            break;
        }
        case 2:
        {

            move = function (rb) {
                rb.rotation -= 4;
            };
            break;
        }
        case 3:
        {

            move = function (rb) {
                rb.rotation += 4;
            };
            break;
        }
        case 4:
        {

            move = function (rb) {
                var angle = Math.PI * (rb.rotation + 90) / 180;
                rb.x -= speed * Math.cos(angle);
                rb.y -= speed * Math.sin(angle);
            };
            break;
        }
        case 0:
        default:
            break;
    }

    /*Move sprite*/
    robotSpriteMovingInterval = window.setInterval(function (e) {
        var rb = easelStage.getChildByName("robotSprite");
        move(rb);
        easelStage.update();
    }, 100);

    /*If timeout to stop defined, set it*/
    if (timeout) {
        setTimeout(function(){
            clearInterval(robotSpriteMovingInterval);
        }, timeout);
    }
};