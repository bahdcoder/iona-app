#!/usr/bin/env bash

name=$1
repo=$2
port=$3
pre_start=$4
post_start=$5
env_variables="${@:6}"

echo $@

#
# Abort with <msg>
#

abort() {
  echo
  echo "  $@" 1>&2
  echo
  exit 1
}

#
# Log <msg>.
#

log() {
  echo "  ○ $@"
}

# clone the new repository
cd "/home/iona/$name"

log Pulling latest repository changes
git pull origin master
test $? -eq 0 || abort Pulling latest repository changes failed

log Setting environment variables
for value in $env_variables; do
  log "The current environment variable being set is $value"
  export $value
  test $? -eq 0 || abort Setting environment variable $value failed.
done

log Execute script before starting application
eval "$pre_start"

log Installing dependencies
if [ -f package.json ]; then
  npm install
else
  log No package.json file found. Skipping installation.
fi

log Execute after starting application
eval "$post_start"

# Start the application using pm2

log Deleting running application
pm2 delete "$name" || true
test $? -eq 0 || abort Failed deleting running application.

log Starting application
pm2 start npm --name "$name" -- start --if-present
test $? -eq 0 || abort Failed to start application

log Application started successfully.

exit
