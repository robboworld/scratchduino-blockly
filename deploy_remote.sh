#!/bin/bash
address="188.166.89.156"
user="root"
rsync -avz ./* "${user}@${address}:~/scratchduino_blockly --exclude='./public/blockly"  
ssh "${user}@${address}" << EOF
ls
logout
EOF
