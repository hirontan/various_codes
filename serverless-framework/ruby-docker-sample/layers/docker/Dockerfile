FROM amazon/aws-lambda-ruby:3.3

ADD layers/gemfiles/Gemfile /var/task/Gemfile
ADD layers/gemfiles/Gemfile.lock /var/task/Gemfile.lock

# https://docs.aws.amazon.com/linux/al2023/release-notes/relnotes.html
RUN dnf install -y \
      gcc \
      make \
      ruby-devel \
      git \
      wget \
      unzip \
      tar \
      gzip \
      glibc-langpack-en \
      procps-ng \
      which && \
    dnf clean all

RUN rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023 && \
    rpm -Uvh https://repo.mysql.com/mysql80-community-release-el9-1.noarch.rpm && \
    dnf install -y mysql-community-devel && \
    dnf clean all

RUN bundle config set path 'vendor/bundle'
RUN bundle install
