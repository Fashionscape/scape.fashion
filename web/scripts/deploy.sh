#!/bin/bash

set -x

USERNAME=ncpierson
IMAGE=fashionscape-web
VERSION=`cat VERSION`

./scripts/build.sh

docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$VERSION
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$VERSION
