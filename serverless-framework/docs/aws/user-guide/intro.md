# AWS - Introduction
https://www.serverless.com/framework/docs/providers/aws/guide/intro/

Serverless Frameworkは、AWS Lambda関数と、それらが必要とするAWSインフラストラクチャリソースの開発とデプロイを支援します。これは、構造、自動化、ベストプラクティスを提供するCLIであり、すぐに利用できるため、FunctionsとEventで構成される洗練されたイベント駆動型のサーバーレスアーキテクチャの構築に集中することができます。

サーバーレスフレームワークが他のアプリケーションフレームワークと異なるのは、以下の点です。

- インフラストラクチャだけでなく、コードも管理します。
- 複数の言語（Node.js、Python、Javaなど）をサポートしています。

## Core Concepts

### Functions
FunctionsはAWSのLambda関数
マイクロサービスのような独立したデプロイの単位です。
クラウドにデプロイされた単なるコードであり、以下のような単一のジョブを実行するために書かれている

- ユーザーをデータベースに保存する
- データベースでのファイル処理
- スケジュールされたタスクの実行

### Events
Lambda Functionsを実行するトリガーとなるものはすべて。
イベントとは、以下のようなインフライベントのこと
- API GatewayのHTTPエンドポイントリクエスト(例: REST API)
- S3のバケットアップロード
- CloudWatchタイマー（例：5分ごとの実行）
- SNSトピック
- CloudWatchのアラート

### Resources
- DynamoDBテーブル（例：Users/Posts/Commentsデータの保存用）
- S3バケット（画像やファイルを保存するためのものなど）
- SNSトピック（例：メッセージを非同期で送信するためのもの）

CloudFormationで定義できるものはすべてサポートされています。

### Services
- サービスはフレームワークの単位
- 一つのアプリケーションに対して複数のサービスを持つ
- 関数やそのトリガーとなるイベント、関数が使用するリソースを定義する場所
- プロジェクトのルートディレクトリにある`serverless.yml`または`serverless.json`のファイルを使用して、`YAML`または`JSON`形式で記述

### Plugins
- プラグインを使ってフレームワークの機能を上書き・拡張
- すべての`serverless.yml`は複数のプラグインを`plugins:`プロパティを含む
