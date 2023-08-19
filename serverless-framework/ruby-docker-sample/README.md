# ServerlessFramework を Docker 上で動かす

※ ローカルのみの検証用です

## 準備

```bash
./layers/builds/build_gems.sh
docker-compose up --build --force-recreate -d
mysql -uroot -h127.0.0.1 -P53306 -proot -e"CREATE DATABASE IF NOT EXISTS sample_development charset=utf8"
mysql -uroot -h127.0.0.1 -P53306 -proot sample_development < ./config/mysql/schema.sql
mysql -uroot -h127.0.0.1 -P53306 -proot sample_development < ./data/comments.sql
```

## 実行

```bash
docker-compose exec serverless sls invoke local -f hello
```
