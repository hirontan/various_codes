# Serverless - AWS Node.js Typescript

## 事前準備

### Node / Serverless Framework / Plugin インストール

```command
nodenv install $(cat .node-version)
npm i -g serverless
yarn
```

## 実行

```command
sls invoke local -f hello --path src/functions/hello/mock.json
```
