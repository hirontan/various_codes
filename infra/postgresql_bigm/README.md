# Postgresql with bigm extension

<https://hub.docker.com/layers/library/postgres/14.5/images/sha256-cd52086b23d9d2ecfe91c25d7570b1368242f151f4aacddf6860f827a22334ac?context=explore>

## verify

```bash
# 1. run container
docker-compose up --build -d

# 2. test extension
docker exec -it postgresql_bigm-db-1 psql -U user -d test -c "CREATE EXTENSION IF NOT EXISTS pg_bigm;"

# 3. confirm extension
docker exec -it postgresql_bigm-db-1 psql -U user -d test -c "SELECT * FROM pg_extension WHERE extname = 'pg_bigm';"

# 4. clean up
docker-compose down
```

## build

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t hirontan3/postgres-bigm:14.5.2 -t hirontan3/postgres-bigm:latest --push .
```

## docker hub url

<https://hub.docker.com/r/hirontan3/postgres-bigm>
