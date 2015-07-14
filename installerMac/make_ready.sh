#!/bin/sh
mv ./build/tmp.dmg ./ScratchDuino-Blockly.dmg
hdiutil convert -format UDZO -o ScratchDuino-Blockly_Ready.dmg ScratchDuino-Blockly.dmg
mv ScratchDuino-Blockly_Ready.dmg ScratchDuino-Blockly.dmg
