FROM amazon/aws-lambda-ruby:3.2

RUN yum update -y && curl -sL https://rpm.nodesource.com/setup_16.x | bash - \
  && yum -y install nodejs && yum -y clean all \
  && npm install -g serverless

WORKDIR /var/task/

COPY . .

CMD ["/bin/bash"]
