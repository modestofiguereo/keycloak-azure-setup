#!/bin/bash

# Setup keycloak
docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up realm-register

# Register services
docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up service-register
