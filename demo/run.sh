#!/bin/bash

ENV_FILE=$(pwd)/.env

source "$ENV_FILE"

EXAMPLE_SERVER_PORT=${EXAMPLE_SERVER_PORT:=8080}

if [ ! -r "$ENV_FILE" ]
  then
    echo "Missing environment file: $ENV_FILE"
    echo "Use the template in .env.example and populate with keys from https://portal.iproov.com."
    exit 1
fi

docker build . -t iproov-web-example
docker run --env-file "$ENV_FILE" -e EXAMPLE_SERVER_PORT="$EXAMPLE_SERVER_PORT" -e IS_DOCKER=1 -p "0.0.0.0:$EXAMPLE_SERVER_PORT":80 --rm iproov-web-example
