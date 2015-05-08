/**
 * Created by xottab on 3/26/15.
 */

Blockly.JavaScript['engine_turn_on_sec'] = function(block) {
    var sec_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
    var time = sec_time*1000; // To milliseconds

    var code = "try{\nglobal_blockly.engine({0});\n}catch(e){}\n".format(time);
    //code += "try{\nsprite_move({0}, {1});\n}catch(e){}\n".format(key, time);
    return code;
};

Blockly.JavaScript['engine_turn_on'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "try{\nglobal_blockly.engine();\n}catch(e){}\n";
    return code;
};

Blockly.JavaScript['engine_turn_off'] = function(block) {
    var code = "try{\nglobal_blockly.stopEngine(\"0\");\n}catch(e){}\n";
    //code+="try{\nsprite_move(\"0\");\n}catch(e){}\n";
    return code;
};

Blockly.JavaScript['engine_direction'] = function(block) {
    var key = block.getFieldValue('direction');

    var code = "try{\nglobal_blockly.setDirection({0});\n}catch(e){}\n".format(key);
    //code += "try{\nsprite_move({0});\n}catch(e){}\n".format(key);
    return code;
};

Blockly.JavaScript['engine_angle'] = function(block) {
    var angle = block.getFieldValue('angle');
    var key = block.getFieldValue('direction');

    var code = "try{\nglobal_blockly.engineAngle({0}, {1});\n}catch(e){}\n".format(key, angle);
    //code += "try{\nsprite_move({0});\n}catch(e){}\n".format(key);
    return code;
};

