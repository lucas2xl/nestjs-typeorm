#!/bin/bash
echo "Installing nestjs dependencies"
npm install -g @nestjs/cli
echo "Installing dependencies"
npm install
echo "Generating the build"
npm run build
echo "starting the application"
npm run start:dev
