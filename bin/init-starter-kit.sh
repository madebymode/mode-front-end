#!/usr/bin/env bash
#
# @see [Install Notes](https://github.com/madebymode/mode-front-end#install)
#
# *NOTE*: This script assumes that you’re running it from your project root
# and that MODE Front-End is installed at `./node_modules/mode-front-end`.

echo "Installing MODE Front-End’s starter files...";
echo "";

PATH_TO_FILES='.';
PATH_TO_ROOT='../..';

# Starter files
mkdir -p "$PATH_TO_ROOT/resources/assets/"
rsync -avz "$PATH_TO_FILES/starter-kit/assets/" "$PATH_TO_ROOT/resources/assets/"
echo "✔ Copied resources/assets/";
cp "$PATH_TO_FILES/resources/views/pages/index.php" "$PATH_TO_ROOT/resources/views/welcome.blade.php"
echo "✔ Copied resources/views/welcome.blade.php";

echo "";
echo "Success!";
echo "";
