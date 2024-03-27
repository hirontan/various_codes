FROM postgres:14.5

# Install the PostgreSQL extension
# RUN apt-get update && apt-get install -y postgresql-14-bigm

RUN apt-get update && \
    apt-get install -y postgresql-14 postgresql-client-14 postgresql-server-dev-14 make gcc git libmecab-dev wget

RUN git clone https://github.com/pgbigm/pg_bigm.git && \
    cd pg_bigm && \
    make USE_PGXS=1 && \
    make USE_PGXS=1 install

RUN service postgresql restart
