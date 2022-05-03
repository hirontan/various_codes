FROM nginx:stable-alpine

ENV TZ Asia/Tokyo

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
