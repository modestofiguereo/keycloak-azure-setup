#!/bin/bash

# Get databases up
docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up -d --build --force-recreate --remove-orphans \
  postgres

sleep 5

# Run migrations

docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up --build --force-recreate --remove-orphans \
  kong-bootstrap

docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up --build --force-recreate --remove-orphans \
  konga-prepare

# Get system up
docker-compose \
  -f $WORKING_DIR/docker/docker-compose.yaml \
  up -d --build --force-recreate --remove-orphans \
  kong iam konga webapp

echo ""
echo ""
echo ""
echo "Waiting for iam service to be ready..."
echo "===================================="

while [[ true ]]; do
  echo -ne "."

  HEALTH_STATUS=$(docker-compose \
    -f $WORKING_DIR/docker/docker-compose.yaml \
    ps | grep iam | awk '{print substr($4,1,9)}')

  if [[ $HEALTH_STATUS -eq '(healthy)' ]] &> /dev/null; then
    echo ""
    echo ""
    echo "It's ready!"
    echo ""
    echo ""
    break
  fi
done

$WORKING_DIR/scripts/bootstrap.sh
