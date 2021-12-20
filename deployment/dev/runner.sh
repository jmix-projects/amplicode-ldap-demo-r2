#!/bin/sh

cd ../../
./gradlew clean build -x test
cd deployment/dev
docker-compose up
