#!/usr/bin/env bash
#
# @see [Install Notes](https://github.com/madebymode/mode-front-end#install)
#
# *NOTE*: This script assumes that you’re running it from your project root
# and that MODE Front-End is installed at `./node_modules/mode-front-end`.

echo "Installing MODE Front-End...";
echo "";

PATH_TO_FILES='.';
PATH_TO_ROOT='../..';

copy_file_to_root() {
  cp "$PATH_TO_FILES/$1" "$PATH_TO_ROOT/$1"
  echo "✔ Copied $1";
}

# Config files
copy_file_to_root .editorconfig
copy_file_to_root .jshintrc
copy_file_to_root .scss-lint.yml

# TODO: Inline updates for .gitignore
# copy_file_to_root .gitignore

echo "";
echo "Success!";
echo "";
