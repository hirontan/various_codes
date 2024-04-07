FROM amazon/aws-lambda-ruby:3.3

RUN dnf upgrade --releasever=2023.2.20231002 && curl -sL https://rpm.nodesource.com/setup_20.x | bash - \
  && dnf -y install nodejs && dnf -y clean all \
  && npm install -g serverless

WORKDIR /var/task/

COPY . .
COPY ./sample_gems/ruby/gems/3.3.0 /root/.local/share/gem/ruby/3.3.0

CMD ["/bin/bash"]
