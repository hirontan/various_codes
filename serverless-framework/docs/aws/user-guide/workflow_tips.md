# Workflow Tips

##### Development Workflow
1. 関数を書く
2. `serverless.yml`に変更を加えた場合とCI/CDシステムでのみ`serverless deploy`を使用する
  - CI/CDの設定の参考：https://www.serverless.com/blog/ci-cd-workflow-serverless-apps-with-circleci
3. `serverless deploy function -f myFunction`を使用して、特定のAWS Lambda Functionで作業しているときに変更をデプロイする
4. `serverless invoke -f myFunction -l`を使用して、AWS上でAWS Lambda Functionをテスト
5. コンソールで別タブを開き、`serverless logs -f myFunction -t`を使ってログをストリーム配信
6. ローカルで実行するテストを書く

##### Using stages
- 最低限、開発ステージと本番ステージを使い分ける
- ステージごとに異なるAWSアカウントを使用
- 大規模なチームでは、各メンバーは別々のAWSアカウントを使用し、開発にはそれぞれのステージを使用する必要がある

##### Lager Projects
- アプリケーション/プロジェクトを複数のServerlessサービスに分割
- データモデルまたはワークフローを中心にサーバーレスサービスをモデル化
- Serverless Services の関数とリソースを最小限に抑える

## Cheat Sheet
- 開発する際に使用するコマンドの便利なリスト

##### Create A Service
- 新しいサービスの作成
```
serverless create -p [SERVICE NAME] -t aws-nodejs
```

##### Install A Service
- Github repoをダウンロードして解凍することで、あらかじめ作られたServerless Serviceをローカルにインストールする
```
serverless install -u [GITHUB URL OF SERVICE]
```

##### Deploy All
- serverless.yml内の関数、イベント、またはリソースに変更を加えた場合や、サービス内のすべての変更を同時にデプロイしたい場合に使用

```
serverless deploy -s [STAGE NAME] -r [REGION NAME] -v
```

##### Deploy Function
- AWS上のLambdaコードを素早く上書きすることで、より高速な開発が可能になる

```
serverless deploy function -f [FUNCTION NAME] -s [STAGE NAME] -r [REGION NAME]
```

##### Invoke Function
- AWS上でAWS Lambda Functionを呼び出し、ログを返す
```
serverless invoke -f [FUNCTION NAME] -s [STAGE NAME] -r [REGION NAME] -l
```

##### Streaming Logs
- コンソールで別タブを開き、このコマンドを使用して特定の関数のすべてのログをストリームする

```
serverless logs -f [FUNCTION NAME] -s [STAGE NAME] -r [REGION NAME]
```




