FROM amazon/aws-lambda-ruby:3.3

ADD layers/gemfiles/Gemfile /var/task/Gemfile
ADD layers/gemfiles/Gemfile.lock /var/task/Gemfile.lock

RUN dnf upgrade --releasever=2023.1.20230906 -y
RUN dnf -y install gcc gcc-c++ make automake
RUN dnf -y localinstall  https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
RUN rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
# RUN dnf -y install mysql-community-devel
# RUN bundle config set path 'vendor/bundle'
# RUN bundle install
