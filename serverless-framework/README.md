# Serverless Framework
https://www.serverless.com/framework/docs/

## 開発環境
https://www.serverless.com/framework/docs/getting-started/

## AWS

### 新規サービス
https://www.serverless.com/framework/docs/providers/aws/cli-reference/create/
```
$ serverless create --template aws-ruby --path ruby-sample --name ruby-sample

or 

$ sls create --template aws-ruby --path ruby-sample --name ruby-sample
```

### ローカル実行

```
$ cd ruby-sample    # 実行可能なディレクトリに移動
$ sls invoke local --function hello
```
