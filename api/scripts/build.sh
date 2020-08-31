#!/bin/bash

set -ex

USERNAME=ncpierson
IMAGE=fashionscape-api

docker build                 \
  --no-cache                 \
  -t $USERNAME/$IMAGE:latest \
  .
