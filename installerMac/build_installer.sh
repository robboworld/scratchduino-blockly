#!/bin/sh
rm -rf build/tmp
mkdir build/tmp
mkdir build/tmp/nodeJS
cp -r ./node ./build/tmp/nodeJS

cp -vr ../bin ./build/tmp/
cp -vr ../locales ./build/tmp/
cp -vr ../node_modules ./build/tmp/
cp -vr ../routes ./build/tmp/
cp -vr ../views ./build/tmp/
cp -vr ../app.js ./build/tmp/
cp -vr ../package.json ./build/tmp/
cp -vr ./run.command ./build/tmp/
rsync  -av --progress  --exclude-from=rsync-exclude.txt ../public ./build/tmp
