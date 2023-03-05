FROM --platform=linux/arm64 node:18-alpine

WORKDIR /usr/app

RUN apk add --no-cache bash

COPY . /usr/app

RUN chmod +x "/usr/app/docker-entrypoint.sh"