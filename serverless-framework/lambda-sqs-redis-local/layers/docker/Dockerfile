FROM amazon/aws-lambda-ruby:3.2

ADD layers/gemfiles/Gemfile /var/task/Gemfile
ADD layers/gemfiles/Gemfile.lock /var/task/Gemfile.lock

RUN bundle config set path 'vendor/bundle'
RUN bundle install
