#!/bin/bash

cd ../../
./gradlew clean build -x test

cd frontend/
npm install

cd ../deployment/dev
docker-compose -f with-frontend-docker-compose.yml up
