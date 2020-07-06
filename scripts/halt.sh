#!/bin/bash

docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  stop