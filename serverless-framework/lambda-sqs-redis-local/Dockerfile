FROM amazon/aws-lambda-ruby:3.2

RUN yum update -y && curl -sL https://rpm.nodesource.com/setup_16.x | bash - \
  && yum -y install nodejs && yum -y clean all \
  && npm install -g serverless

WORKDIR /var/task/

COPY . .
COPY ./sample_gems/ruby/gems/3.2.0 /root/.local/share/gem/ruby/3.2.0

CMD ["/bin/bash"]
