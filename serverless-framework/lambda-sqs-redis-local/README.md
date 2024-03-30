# ServerlessFramework を Docker 上で動かす

※ ローカルのみの検証用です

## 準備

```bash
yarn
./layers/builds/build_gems.sh
docker-compose up --build --force-recreate -d
aws sqs create-queue --queue-name test --endpoint-url http://localhost:54566
```

## 実行

### キューの作成

```bash
aws sqs send-message --queue-url http://localhost:54566/000000000000/test --message-body "Hello World" --endpoint-url http://localhost:54566
```

### ローカル実行

```bash
docker-compose exec serverless sls invoke local -f hello
```
