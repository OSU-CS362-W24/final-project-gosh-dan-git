#!/usr/bin/env bash

#
# Simple "build" script that just copies the app into the build/ directory.
#

mkdir build/
rm -rf build/*
cp -r index/*.html index/*.css gallery/*.js index/goshDanGit_build/