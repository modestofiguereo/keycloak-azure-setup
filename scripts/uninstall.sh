#!/bin/bash

docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  down -v --remove-orphans --rmi local