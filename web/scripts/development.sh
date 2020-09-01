#!/bin/bash

CONTAINER=fashionscape-web

set -e

connect () {
  local OPTIND

  while getopts "a" option; do
    case "$option" in
      a) connect_app;;
    esac
  done
}

connect_app () {
  docker exec -it \
    $CONTAINER    \
    sh
}

down () {
  docker stop $CONTAINER
  docker rm $CONTAINER
}

up () {
  docker run          \
    --name=$CONTAINER \
    --detach          \
    -p 3000:80        \
    ncpierson/$CONTAINER:latest
}

# Begin Script

COMMAND=${1}
shift

case "$COMMAND" in
  connect) connect $@;;
  down) down;;
  up) up $@;;
esac
