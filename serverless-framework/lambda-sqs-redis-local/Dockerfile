FROM node:20 as node

FROM amazon/aws-lambda-ruby:3.2.2024.03.21.18
COPY --from=node /usr/local/bin/node /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/

RUN yum update -y && yum -y clean all \
  && npm install -g serverless \
  && npm install -g yarn

WORKDIR /var/task/

COPY . .
COPY ./sample_gems/ruby/gems/3.2.0 /root/.local/share/gem/ruby/3.2.0

RUN yarn

CMD ["/bin/bash"]
