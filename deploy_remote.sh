#!/bin/bash
address="188.166.89.156"
user="root"
rsync -avz  \
           ./* ${user}@isae.me:~/scratchduino-blockly
ssh "${user}@${address}" << EOF
tmux attach
cd scratchduino-blockly
lsof -t -i:3000 | xargs kill -9
./run.sh &
exit
EOF
