#!/bin/bash
address="188.166.89.156"
user="root"
rsync -avz --exclude /public/blockly/ \
           --exclude /public/blockly/.git/ \
           ./* ${user}@isae.me:~/scratchduino-blockly
ssh "${user}@${address}" << EOF
ls
cd scratchduino-blockly
./run.sh
logout
EOF
