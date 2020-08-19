# AWS - Packaging

## Package CLI Command

- プロジェクトをAWSにデプロイせずにパッケージ化することができる
- 一貫したデプロイ可能な成果物を確保するためにCI/CDワークフローと一緒に使用することが適切

- 以下のコマンドを実行すると、サービスの`.serverless`ディレクトリにすべてのデプロイアーティファクトがビルドされて保存

```
serverless package
```

- `--package`オプションを使用して保存先のパスを追加できる

```
serverless package --package my-artifacts
```

## Package Configuration

##### Exclude / include
- `Exclude`および`include`では、成果物から除外/包括するglobを定義できる
- ファイルをインクルードしたい場合は、exclude の !re-include-me/** や include のように、先頭に`!`を付けたglobパターンを使用できる
- globパターンを順番に実行
- 最初に exclude で定義されたグロブを適用。その後、include からのすべてのグロブを追加
  - 以前に除外したファイルやディレクトリをいつでも再除外できる

##### デフォルトExclude
- .git/**
- .gitignore
- .DS_Store
- npm-debug.log
- .serverless/**
- .serverless_plugins/**

##### Examples
- すべてのnode_modulesを除外し、特定のモジュール（この場合はnode-fetch）を再インクルード
```
package:
  exclude:
    - node_modules/**
    - '!node_modules/node-fetch/**'
```

- exclude と include を使って handler.js 以外のすべてのファイルを除外する
```
package:
  exclude:
    - src/**
  include:
    - src/function/handler.js
```

##### Artifact
- パッケージ化プロセスを完全に制御するために、独自のアーティファクト zip ファイルを指定できる
- 設定されている場合、Serverless はサービスの zip を実行しないため、 exclude と include は無視される
- アーティファクトを使用するか、include / exclude を使用します。
- アーティファクトオプションは、Java 用の Maven のようにデプロイ可能なアーティファクトを生成できる開発環境がある場合に特に便利

### Service package
```
service: my-service
package:
  artifact: path/to/my-artifact.zip
```

### Individual function packages
```
service: my-service

package:
  individually: true

functions:
  hello:
    handler: com.serverless.Handler
  package:
    artifact: hello.jar
  events:
    - http:
        path: hello
        method: get
```

##### Packaging functions separately
- デプロイをさらに制御したい場合は、それらの関数を独立してパッケージ化するように設定できる
  - 配置を最適化するための制御を強化できる
  - 個別のパッケージ化を有効にするには、サービスまたは関数全体のパッケージ化設定で個別にtrueを設定

- 各関数に対して、サービス全体と同じように exclude、include、アーティファクト設定オプションを使用できる

```
service: my-service
package:
  individually: true
  exclude:
    - excluded-by-default.json
functions:
  hello:
    handler: handler.hello
    package:
      # We're including this file so it will be in the final package of this function only
      include:
        - excluded-by-default.json
  world:
    handler: handler.hello
    package:
      exclude:
        - some-file.js
```

- 関数レベルで個別フラグを設定することで、どの関数を個別にパッケージ化し、残りはサービスパッケージを利用させるかを選択できる

```
service: my-service
functions:
  hello:
    handler: handler.hello
  world:
    handler: handler.hello
    package:
      individually: true
```

##### Development dependencies
- 開発依存関係を自動検出して除外する
- 本番環境に関連するパッケージとモジュールのみが zip ファイルに含まれるようになる
  - アップロードされるパッケージの全体サイズが大幅に削減される
- `excludeDevDependencies`パッケージ設定を false に設定することで、自動的な dev 依存関係の除外をオプトアウトすることができる

```
package:
  excludeDevDependencies: false
```
