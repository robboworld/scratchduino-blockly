#!/bin/sh
echo Welcome to ScratchDuino-Blockly
cd "$(dirname "$0")"
./nodeJS/node ./bin/www & pid=$!
PID_LIST+=" $pid";
open http://localhost:3000 & pid=$!
PID_LIST+=" $pid";

trap "kill $PID_LIST" SIGINT
wait $PID_LIST
echo
echo "Good bye, dear friend!";
