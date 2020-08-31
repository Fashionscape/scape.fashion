#!/bin/bash

set -ex

USERNAME=ncpierson
IMAGE=fashionscape-web

docker build                     \
  --no-cache                     \
  -t $USERNAME/$IMAGE:latest     \
  .
