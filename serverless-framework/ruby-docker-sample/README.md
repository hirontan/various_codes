# ServerlessFramework を Docker 上で動かす

## 準備

```bash
docker-compose up --build --force-recreate -d
```

## 実行

```bash
docker-compose exec serverless sls invoke local -f hello
```
