#!/bin/bash -x

set -e

LAYER=sample_gems

rm -rf ${LAYER} && mkdir -p ${LAYER}/ruby/gems

docker build -t ruby33-builder -f layers/docker/Dockerfile .

CONTAINER=$(docker run -d ruby33-builder false)

docker cp \
    $CONTAINER:/var/task/vendor/bundle/ruby/3.3.0 \
    ${LAYER}/ruby/gems/3.3.0

docker rm $CONTAINER --force
