#!/bin/bash
address="188.166.89.156"
user="root"
rsync -avz --exclude /public/blockly/ \
           --exclude /public/blockly/.git/ \
           ./* ${user}@isae.me:~/scratchduino-blockly
ssh "${user}@${address}" << EOF
cd scratchduino-blockly
lsof -t -i:3000 | xargs kill -9
./run.sh &
logout
EOF
