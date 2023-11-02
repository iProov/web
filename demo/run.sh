#!/bin/bash

ENV_FILE=$(pwd)/.env

source "$ENV_FILE"

EXAMPLE_SERVER_PORT=${EXAMPLE_SERVER_PORT:=8080}

yarn install

if [ ! -r "$ENV_FILE" ]
  then
    echo "Missing environment file: $ENV_FILE"
    echo "Use the template in .env.example and populate with keys from https://portal.iproov.com."
    exit 1
fi

docker build -t iproov-web-demo --build-arg NPM_ACCESS_TOKEN=$NPM_ACCESS_TOKEN .
docker run --env-file "$ENV_FILE" -e EXAMPLE_SERVER_PORT="$EXAMPLE_SERVER_PORT" -e PORT="$PORT" -p "$EXAMPLE_SERVER_PORT":"$PORT" --rm iproov-web-demo