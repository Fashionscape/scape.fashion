#!/bin/bash

docker run                \
  --name=fashionscape-web \
  --detach                \
  -p 3000:80              \
  ncpierson/fashionscape-web:latest
