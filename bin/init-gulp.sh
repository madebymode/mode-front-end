#!/usr/bin/env bash
#
# @see [Install Notes](https://github.com/tannerhodges/mode-front-end#install)
#
# *NOTE*: This script assumes that you’re running it from your project root
# and that MODE Front-end is installed at `./node_modules/mode-front-end`.

echo "Installing MODE Front-end’s gulp build...";
echo "";

PATH_TO_FILES='.';
PATH_TO_ROOT='../..';

copy_file_to_root() {
  cp "$PATH_TO_FILES/$1" "$PATH_TO_ROOT/$1"
  echo "✔ Copied $1";
}

# Gulp build
copy_file_to_root gulpfile.js
mkdir -p "$PATH_TO_ROOT/gulp-tasks/"
rsync -avz "$PATH_TO_FILES/gulp-tasks/" "$PATH_TO_ROOT/gulp-tasks/"
echo "✔ Copied gulp-tasks/";

echo "";
echo "Success!";
echo "";
