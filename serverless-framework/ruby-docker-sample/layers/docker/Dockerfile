FROM amazon/aws-lambda-ruby:3.2

ADD layers/gemfiles/Gemfile /var/task/Gemfile
ADD layers/gemfiles/Gemfile.lock /var/task/Gemfile.lock

RUN yum -y install gcc gcc-c++ make automake
RUN yum -y install mysql-devel
RUN bundle config set path 'vendor/bundle'
RUN bundle install
