/**
 * Created by Pais on 09.05.2015.
 */

var robotSpriteMovingInterval;

function sprite_interface() {

}

sprite_interface.move = function(direction, timeout) {
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
};