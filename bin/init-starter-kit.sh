#!/usr/bin/env bash
#
# @see [Install Notes](https://github.com/tannerhodges/mode-front-end#install)
#
# *NOTE*: This script assumes that you’re running it from your project root
# and that MODE Front-end is installed at `./node_modules/mode-front-end`.

echo "Installing MODE Front-end’s starter files...";
echo "";

PATH_TO_FILES='.';
PATH_TO_ROOT='../..';

# Starter files
mkdir -p "$PATH_TO_ROOT/resources/assets/"
rsync -avz "$PATH_TO_FILES/example/assets/" "$PATH_TO_ROOT/resources/assets/"
echo "✔ Copied resources/assets/";

echo "";
echo "Success!";
echo "";
