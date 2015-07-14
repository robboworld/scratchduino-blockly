#!/usr/bin/env bash
ARG_64="x64"
ARG_32="x86"
TYPE=0
mkdir build
function printUsage {
        echo "Usage: buildinstaller.sh <x64/x86>"
        exit;
}
if [ $# != 1 ]
    then
        printUsage
fi
rm -rf build/tmp
mkdir build/tmp
mkdir build/tmp/node
if [ $1 = ${ARG_64} ]
    then
        echo "Building installer for x64 Linux"
        TYPE=1
        cp -r ./x64/* ./build/tmp/node
    else
        if [ $1 = ${ARG_32} ]
        then
            echo "Building installer for x86 Linux"
            TYPE=2
            cp -r ./x86/* ./build/tmp/node
        else
            printUsage
        fi
fi
cp -vr ../bin ./build/tmp/
cp -vr ../locales ./build/tmp/
cp -vr ../node_modules ./build/tmp/
cp -vr ../routes ./build/tmp/
cp -vr ../views ./build/tmp/
cp -vr ../app.js ./build/tmp/
cp -vr ../package.json ./build/tmp/
cp -vr ./run.sh ./build/tmp/
rsync  -av --progress  --exclude-from=exclude ../public ./build/tmp
