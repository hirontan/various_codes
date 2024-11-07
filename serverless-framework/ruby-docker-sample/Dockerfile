FROM amazon/aws-lambda-ruby:3.3

RUN dnf update -y && curl -sL https://rpm.nodesource.com/setup_20.x | bash - \
  && dnf -y install nodejs && yum -y clean all \
  && npm install -g serverless

WORKDIR /var/task/

COPY . .
COPY ./sample_gems/ruby/gems/3.3.0 /root/.local/share/gem/ruby/3.3.0
COPY ./sample_gems/lib /opt/lib

CMD ["/bin/bash"]
