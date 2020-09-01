#!/bin/bash

CONTAINER=fashionscape-api

set -e

connect () {
  local OPTIND

  while getopts "ad" option; do
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
  docker-compose          \
    -f docker-compose.yml \
    down
}

execute () {
  docker exec -it \
    $CONTAINER    \
    $@
}

logs () {
  docker-compose          \
    -f docker-compose.yml \
    logs                  \
    $@
}

up () {
  local OPTIND

  docker-compose          \
    -f docker-compose.yml \
    up                    \
    --detach              \
    $@
}

# Begin Script

COMMAND=${1}
shift

case "$COMMAND" in
  connect) connect $@;;
  down) down;;
  exec) execute $@;;
  logs) logs $@;;
  up) up $@;;
esac
