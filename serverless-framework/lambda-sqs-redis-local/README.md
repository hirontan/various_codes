# ServerlessFramework を Docker 上で動かす

※ ローカルのみの検証用です

## 準備

```bash
nodenv install $(cat .node-version)
yarn
./layers/builds/build_gems.sh
docker-compose up --build --force-recreate -d
```

## 実行

### ローカル実行

```bash
docker-compose exec serverless sls offline start
./scripts/test_queue.rb
```
