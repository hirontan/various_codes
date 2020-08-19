# Services
https://www.serverless.com/framework/docs/providers/aws/guide/services/

- サービスはプロジェクトのようなもの
- Lambda Functions、それらをトリガーとするイベント、必要とするインフラリソースを定義し、すべて`serverless.yml`ファイルに記述

## Organization

- 単一のサービスを使用して、そのプロジェクトのすべての機能、イベント、およびリソースを定義

```
myService/
  serverless.yml  # Contains all functions and infrastructure resources
```

- 複数のサービスに分割
  - ワークフローやデータモデルによってサービスを整理し、それらのワークフローやデータモデルに関連する機能をサービス内にまとめる

```
users/
  serverless.yml # Contains 4 functions that do Users CRUD operations and the Users database
posts/
  serverless.yml # Contains 4 functions that do Posts CRUD operations and the Posts database
comments/
  serverless.yml # Contains 4 functions that do Comments CRUD operations and the Comments database
```

## Creation
- サービス作成は、`create`コマンドを利用
- サービスを記述するランタイム (node.js、python など) を指定する

```
# Create service with nodeJS template in the folder ./myService
serverless create --template aws-nodejs --path myService
```

### Lambdaで利用できるテンプレート
- aws-clojurescript-gradle
- aws-clojure-gradle
- aws-nodejs
- aws-nodejs-typescript
- aws-alexa-typescript
- aws-nodejs-ecma-script
- aws-python
- aws-python3
- aws-ruby
- aws-provided
- aws-kotlin-jvm-maven
- aws-kotlin-nodejs-gradle
- aws-groovy-gradle
- aws-java-gradle
- aws-java-maven
- aws-scala-sbt
- aws-csharp
- aws-fsharp
- aws-go
- aws-go-dep
- aws-go-mod

## Contents

### serverless.yml
各サービスの設定は、`serverless.yml`ファイルで管理

- 主な役割
  - サービスの宣言
  - サービスに1つ以上の機能を定義
  - サービスがデプロイされるプロバイダを定義 (提供されている場合はランタイムも)
  - 使用するカスタムプラグイン定義
  - 各関数の実行のトリガーとなるイベントを定義（HTTPリクエストなど）
  - サービスの機能が必要とするリソースのセット（例：1 DynamoDBテーブル）を定義。
  - `events`セクションにリストされているイベントが、デプロイ時にイベントに必要なリソースを自動的に作成
  - 変数を使用した柔軟な設定
- すべての`serverless.yml`は単一の`CloudFormation`テンプレートに変換され、`CloudFormation`スタックが作成される

### handler.js / handler.rb ...
- 関数のコードを含む
- `serverless.yml`の関数定義は、このファイルと、エクスポートされた関数を指す

### event.json
- デフォルトでは作成されない
- `sls invoke -p event.json`でデータを使った関数を起動できる

## Deployment
- サービスをデプロイするとき、`serverless.yml`内のすべての関数、イベント、リソースが`CloudFormation`テンプレートに変換され、CloudFormationスタックとしてデプロイされる

```
cd my-service
serverless deploy
```

- デプロイのデフォルトは、dev stage / us-east-1リージョン
- その他指定方法は下記

```
serverless deploy --stage prod --region us-east-1
```

## Removal
AWSアカウントからサービスを削除する
```
serverless remove
```

削除プロセスを起動
```
serverless remove -v
```

## Version Pinning
```
npm install -g serverless
```
でグローバルにインストールされます。
この方法では、すべてのサービスで Serverless CLI を利用できる

グローバルにツールをインストールすると、バージョンをpackage.jsonの中に固定できないという欠点がある
`Serverless`をアップグレードしても、同僚やCIシステムがアップグレードしない場合に問題が発生する可能性がある
CIシステムが古いバージョンの`Serverless`でデプロイする心配をすることなく、最新バージョンでしか利用できない新機能を`serverless.yml`で利用できるようになりました。

### Pinning a Version
- バージョン固定を設定するには、`serverless.yaml`で`frameworkVersion`プロパティを定義
- `CLI`から`Serverless`コマンドを実行するたびに、`Serverless`バージョンが`frameworkVersion`の範囲と一致しているかチェックする
- `CLI`はセマンティック・バージョニングを利用しており、正確なバージョンに固定や範囲指定にできる

### Examples

##### Exact Version
```
# serverless.yml

frameworkVersion: "=1.0.3"

service: users

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 512

…
```

##### Version Range
```
# serverless.yml

frameworkVersion: ">=1.0.0 <2.0.0"

service: users

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 512

…
```

## Installing Serverless in an existing service
```
# from within a service
npm install serverless --save-dev
```
