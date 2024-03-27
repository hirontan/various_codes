# Postgresql with bigm extension

<https://hub.docker.com/layers/library/postgres/14.5/images/sha256-cd52086b23d9d2ecfe91c25d7570b1368242f151f4aacddf6860f827a22334ac?context=explore>

## build

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t hirontan3/postgres-bigm:14.5 --push .
```

## docker hub url

<https://hub.docker.com/r/hirontan3/postgres-bigm>
