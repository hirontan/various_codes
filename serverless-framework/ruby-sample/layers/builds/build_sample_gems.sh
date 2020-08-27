#!/bin/bash -x

set -e

LAYER=sample_gems
bundle install --gemfile=layers/gemfiles/Gemfile_${LAYER} --path=../../${LAYER}

rm -rf $LAYER && mkdir -p ${LAYER}/ruby/gems

docker build -t ruby27-builder -f layers/docker/Dockerfile_${LAYER} .

CONTAINER=$(docker run -d ruby27-builder false)

docker cp \
    $CONTAINER:/var/task/vendor/bundle/ruby/2.7.0 \
    ${LAYER}/ruby/gems/2.7.0

docker rm $CONTAINER
