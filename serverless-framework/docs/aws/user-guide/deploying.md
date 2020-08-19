# AWS - Deploying

## Deploy All
- `serverless.yml`で関数、イベント、またはリソースの設定を更新し、その変更 (または複数の変更を同時に) をデプロイしたい場合に、この方法を利用
  - メモ: `--force`オプションを使用してデプロイを強制するか、`--config`オプションで別の設定ファイル名を指定することができる
```
serverless deploy
```

### How It Works

- AWS CloudFormationのテンプレートは`serverless.yml`から生成
- スタックがまだ作成されていない場合は、S3バケットを除いて何もリソースがない状態で作成され、S3バケットにはFunctionのコードがzipファイルとして保存
- `Functions`のコードは`zip`ファイルにパッケージ化
- 前回のデプロイのすべてのファイルのハッシュを取得し（あれば）、ローカルファイルのハッシュと比較
- すべてのファイルのハッシュが同じ場合、Serverless は配置プロセスを終了します。
- `Functions`のコードの`zip`ファイルが Code S3 Bucketにアップロード
- 任意のIAM Roles、Functions、Event、Resourcesは、AWS CloudFormationテンプレートに追加
- CloudFormationスタックが新しいCloudFormationテンプレートで更新
- 各デプロイでは、サービスの各機能ごとに新しいバージョンが公開

### Tips
- CI/CDシステムとして利用
- `serverless deploy --verbose`を利用すると、デプロイ中の進捗状況を表示できる
- CloudFormationは動作が遅いので、`serverless deploy function`コマンドを利用する
- デフォルト：`dev`ステージと`us-east-1`リージョン

```
# serverless.yml

service: service-name
provider:
  name: aws
  stage: beta
  region: us-west-2
```

- 異なるステージやリージョンにデプロイも可能：`serverless deploy --stage production --region eu-central-1`
- 成果物を保存するためにS3バケットを指定できる
  - `provider`配下の`deploymentBucket`設定では、`name`や`serverSideEncryption`メソッドを設定できる
  - バケットを指定しない場合、デフォルトの`AES256`暗号化を使用するバケットを作成
- 成果物を格納するためのS3 プレフィックスを指定できる
  - `provider`配下の`deploymentPrefix`設定では、成果物を保存するプレフィックスを設定できる
  - 指定しない場合は、デフォルトは`serverless`
- S3 へのアップロードを高速化するには`--aws-s3-accelerate`を追加
- すべての詳細とオプションについては、デプロイコマンドのドキュメントをチェックしてください。

https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/

## Deploy Function
- このデプロイ方法は、AWS CloudFormation Stackには触れない
- AWS上の関数のzipファイルを上書きするだけ
- CloudFormationに依存しないので、より高速

```
serverless deploy function --function myFunction
```

- メモ１：`--force`オプションを利用し、デプロイを強制する
- メモ２：`--update-config`を利用し、コードをデプロイせずに`Lambda`の設定だけを変更できる

### How It Works
- 対象のAWS Lambda Functionをzipファイルにパッケージ化
- 既にアップロードされた関数のハッシュを取得し、ローカルの.zipファイルのハッシュと比較
- 両方のハッシュが同じであれば、Frameworkは終了
- その zip ファイルは、CloudFormation スタックが指し示している前の関数と同じ名前を使って S3 バケットにアップロード

### Tips
- 開発中にAWS上でテストしたい場合に使用

https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/

## Deploying a package
- すでに`serverless package`で作成されたデプロイディレクトリを取得し、cloud providerにデプロイされる
- CI/CDワークフローを Serverless Framework に簡単に統合することができる

```
serverless deploy --package path-to-package
```

### How It Works
- `--package`引数は、パッケージ化されたディレクトリを指定(serverless packageと共に)。
- デプロイプロセスはパッケージステップをバイパスし、既存のパッケージを使用してCloudFormationスタックのデプロイと更新を行う

