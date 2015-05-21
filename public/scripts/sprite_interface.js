/**
 * Created by Pais on 09.05.2015.
 */

var robotSpriteMovingInterval = null;

function sprite_interface() {

}

sprite_interface.moveInterval = null;
sprite_interface.SPEED = 5;
sprite_interface.moveFunc = null;

sprite_interface.setDirection = function(direction) {
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

sprite_interface.move = function (mode, stopTimeout) {

    clearInterval(sprite_interface.moveInterval);

    switch (mode) {
        case "5":
            /*Move sprite*/
            sprite_interface.moveInterval = window.setInterval(function (e) {
                var rb = easelStage.getChildByName("robotSprite");
                sprite_interface.moveFunc(rb);
                easelStage.update();
            }, 100);

            /*If timeout to stop defined, set it*/
            if (stopTimeout) {
                setTimeout(function () {
                    clearInterval(sprite_interface.moveInterval);
                }, stopTimeout);
            };
            break;
        default:
            break;
    }
};