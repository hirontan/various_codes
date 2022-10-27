FROM php:7.4-fpm

ENV TZ Asia/Tokyo

RUN apt-get update && \
  apt-get install -y git unzip libzip-dev libicu-dev libonig-dev && \
  docker-php-ext-install intl pdo_mysql zip bcmath

ADD ./docker/app/php/php.ini /usr/local/etc/php/php.ini
ADD ./docker/app/php/zzz-app.conf /usr/local/etc/php-fpm.d/zzz-app.conf

RUN mkdir /var/run/php-fpm
VOLUME ["/var/run/php-fpm"]

COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . /app

RUN composer install && \
  php artisan cache:clear && \
  php artisan config:clear && \
  chmod -R 777 storage
