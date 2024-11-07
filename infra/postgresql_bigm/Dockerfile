FROM postgres:14.5 AS build

RUN apt-get update && \
    apt-get install -y postgresql-14 postgresql-client-14 postgresql-server-dev-14 make gcc git libmecab-dev wget ca-certificates && \
    update-ca-certificates

RUN git clone https://github.com/pgbigm/pg_bigm.git && \
    cd pg_bigm && \
    make USE_PGXS=1 && \
    make USE_PGXS=1 install && \
    cd .. && rm -rf pg_bigm

FROM postgres:14.5

COPY --from=build /usr/lib/postgresql/14/lib/pg_bigm.so /usr/lib/postgresql/14/lib/
