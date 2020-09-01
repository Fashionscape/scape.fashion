#!/bin/bash

set -e

USERNAME=ncpierson
IMAGE=fashionscape-api
VERSION=`cat .version`

# Begin Functions

build () {
  docker build                 \
    --no-cache                 \
    -t $USERNAME/$IMAGE:latest \
    .

  docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$VERSION
}

push () {
  docker push $USERNAME/$IMAGE:latest
  docker push $USERNAME/$IMAGE:$VERSION
}

# Begin Script

COMMAND=${1}
shift

case "$COMMAND" in
  build) build $@;;
  deploy)
    build
    push
    ;;
  push) push $@;;
esac
