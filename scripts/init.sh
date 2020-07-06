#!/bin/bash

# Run services
docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up -d --remove-orphans postgres kong iam konga webapp

# Register services
docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up realm-register

docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up service-register
