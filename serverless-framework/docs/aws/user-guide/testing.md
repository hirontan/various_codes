# AWS - Testing

- サーバレスアーキテクチャはビジネスロジックの提供にシンプルさはあるが、テストに課題がある
- 課題
  - 独立し分散したサービスを統合したもので、独立、あるいは一緒にテストする必要がある
  - ローカルでエミュレートするのが難しいインターネット/クラウドサービスに依存
  - イベント駆動型の非同期ワークフローを特徴とすることができますが、これを完全にエミュレートすることは困難
- 課題を克服するために・・・
  - ビジネスロジックを FaaS プロバイダ（AWS Lambda など）とは別のものにして、再利用可能でテストが容易なものにする
  - ビジネスロジックがFaaSプロバイダーとは別に記述されている場合、従来のユニットテストを記述して適切に動作していることを確認できる
  - 他のサービスとの統合が正しく動作していることを確認するために、統合テストを書く

## A Poor Example
- Node.jsの例として、上記のプラクティスに従う方法を示す
- ex) この関数が実行すべき仕事は、ユーザをデータベースに保存してから、ウェルカムメールを送信すること
```
const db = require('db').connect();
const mailer = require('mailer');

module.exports.saveUser = (event, context, callback) => {
  const user = {
    email: event.email,
    created_at: Date.now(),
  };

  db.saveUser(user, function(err) {
    if (err) {
      callback(err);
    } else {
      mailer.sendWelcomeEmail(event.email);
      callback();
    }
  });
};
```

- この関数の問題点
  - ビジネスロジックはFaaS Providerとは別でない
    - AWS Lambdaが受信データ（Lambdaのイベントオブジェクト）をどのように渡すかに縛られている
  - 関数をテストするために、別のサービスに頼ることになっている
    - データベースとメールサーバの実行

## Writing Testable  AWS Lambda Functions
- 例をリファクタリングして、ビジネスロジックとFaaSプロバイダーを分離してみる

```
class Users {
  constructor(db, mailer) {
    this.db = db;
    this.mailer = mailer;
  }

  save(email, callback) {
    const user = {
      email: email,
      created_at: Date.now(),
    };

    this.db.saveUser(user, function(err) {
      if (err) {
        callback(err);
      } else {
        this.mailer.sendWelcomeEmail(email);
        callback();
      }
    });
  }
}

module.exports = Users;
```

```
const db = require('db').connect();
const mailer = require('mailer');
const Users = require('users');

let users = new Users(db, mailer);

module.exports.saveUser = (event, context, callback) => {
  users.save(event.email, callback);
};
```

- ビジネスロジックを分離
- 依存関係の設定、インジェクション、ビジネスロジック関数の呼び出し、AWS Lambdaとのやりとりを担当するコードは別のファイルにあり、変更される頻度は少なくなる。
  - ビジネスロジックはプロバイダに依存せず、再利用しやすく、テストしやすくなる
- このコードは外部サービスを実行する必要がない
  - `db`と`mailer`サービスの代わりに、モックを使い、`saveUser`と`sendWelcomeEmail`が適切な引数で呼び出されたかどうかをアサートできる
- ユニットテストは上記のクラスをカバーするために簡単に書ける
  - フィクスチャのメールアドレスで関数を呼び出して統合テストを追加し、ユーザが実際にDBに保存されているかどうかをチェックし、メールが受信されたかどうかをチェックして、すべてが連携して動いているかどうかを確認することができる

## Other
- ローカルテストを助けるサービス
  - DynamoDB Local: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
  - Kinesis: https://github.com/mhart/kinesalite
