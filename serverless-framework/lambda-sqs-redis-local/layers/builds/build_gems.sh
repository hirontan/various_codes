#!/bin/bash -x

set -e

LAYER=sample_gems

rm -rf ${LAYER} && mkdir -p ${LAYER}/ruby/gems

docker build -t ruby32-builder -f layers/docker/Dockerfile .

CONTAINER=$(docker run -d ruby32-builder false)

docker cp \
    $CONTAINER:/var/task/vendor/bundle/ruby/3.2.0 \
    ${LAYER}/ruby/gems/3.2.0

docker cp \
    $CONTAINER:/usr/lib64/mysql ${LAYER}
mv ${LAYER}/mysql ${LAYER}/lib

docker rm $CONTAINER --force
