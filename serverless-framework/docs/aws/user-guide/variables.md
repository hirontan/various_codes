# AWS - Variables

- 変数を使用すると、serverless.yml の設定値を動的に置き換えられる
- 変数は、サービスに秘匿性を提供して使用する場合や、複数のステージで作業する場合に特に便利

## Syntax
- 変数を使用するには、 `${}`で囲まれた値を参照する必要がある
```
# serverless.yml file
yamlKeyXYZ: ${variableSource} # see list of current variable sources below
# this is an example of providing a default value as the second parameter
otherYamlKey: ${variableSource, defaultValue}
```

- CloudFormation の構文と競合する場合は、独自の変数構文（正規表現）を定義できる
- メモ：変数はserverless.ymlのプロパティ値でのみ使用でき、プロパティキーでは使用できません
  - ex) カスタムリソースで動的論理IDを生成するために変数を使用することはできません。

## Current variable sources
- Serverlessコア変数
- 環境変数
- CLIオプション
- serverless.yml で定義されているその他のプロパティ
- 外部YAML/JSONファイル
- S3からの変数
- AWS SSMパラメータストアからの変数
- AWS Secrets Managerからの変数
- CloudFormation スタック出力
- Javascript ファイルからエクスポートされたプロパティ（同期または非同期
- 疑似パラメータリファレンス
- 文字列変数の値をブール値として読み込む

## Casting string variables to boolean values

## Recursively reference properties
- 変数システムを使ってプロパティを再帰的に参照することもできる
  - 複数の値と変数のソースを組み合わせることができる

```
provider:
  name: aws
  stage: ${opt:stage, 'dev'}
  environment:
    MY_SECRET: ${file(../config.${opt:stage, self:provider.stage, 'dev'}.json):CREDS}
```

- `sls deploy --stage qa`を実行
  - `${file(./config.${opt:stage, self:provider.stage, 'dev'}.json):CREDS}`変数の中で`stage=qa`オプションが使用され、config.qa.jsonファイルを解決し、定義されたCREDSキーを使用する

### How that works

1. stageは`sls deploy --stage qa`コマンドに与えられたオプションで`qa`に設定
2. `${opt:stage, self:provider.stage, 'dev'}`はqaとして解決し、`${file(./config.${opt:stage, self:provider.stage, 'dev'}.json):CREDS}`で利用される
3. `${file(./config.qa.json):CREDS}`が見つかり、`CREDS`の値が読み込まれる
4. `MY_SECRET`の値が設定

## Reference Properties In serverless.yml
- serverless.ymlでプロパティを参照するには、serverless.ymlで`${self:someProperty}`構文を利用
- `someProperty`には、参照のための空文字列、または任意の深さの属性への点線属性参照を指定できる

```
service: new-service
provider: aws
custom:
  globalSchedule: rate(10 minutes)
  newService: ${self:}
  # the following will resolve identically in other serverless.yml files so long as they define
  # `custom.newService: ${file(<relative-path-to-this-file>/serverless.yml)}`
  exportName: ${self:custom.newService.service}-export

functions:
  hello:
    handler: handler.hello
    events:
      - schedule: ${self:custom.globalSchedule}
  world:
    handler: handler.world
    events:
      - schedule: ${self:custom.globalSchedule}
resources:
  Outputs:
    NewServiceExport:
      Value: 'A Value To Export'
      Export:
        Name: ${self:custom.exportName}
```

## Referencing Serverless Core Variables
- 内部的に使用されるコア変数を初期化
- `{sls:}`変数の接頭辞で再利用できる

### instanceId
- Serverless CLIが実行されるたびに生成されるランダムID
- 予測可能なランダム変数が必要な場合に使用できる

```
service: new-service
provider: aws

functions:
  func1:
    name: function-1
    handler: handler.func1
    environment:
      APIG_DEPLOYMENT_ID: ApiGatewayDeployment${sls:instanceId}
```

## Referencing Environment Variables
- 環境変数を参照：`${env:SOME_VAR}`構文を利用
- SOME_VARの代わりに空文字列を使用することが有効
  - `${env:}`を宣言することで、`process.env`オブジェクト(環境で定義されている全ての変数)を埋め込むことができる
- メモ：環境変数を通して提供された機密情報は、保護されていない、または一般にアクセス可能なビルドログやCloudFormationテンプレートなどに書き込まれる可能性があることを覚えておいてください。

```
service: new-service
provider: aws
functions:
  hello:
    name: ${env:FUNC_PREFIX}-hello
    handler: handler.hello
  world:
    name: ${env:FUNC_PREFIX}-world
    handler: handler.world
```

## Referencing CLI Options
- 渡されたCLIオプションを参照するには、`${opt:some_option}`構文を利用
- some_optionの代わりに空文字列を使用することが有効
  - `${opt:}`を宣言することで、`option`オブジェクト(全てのコマンドラインオプション)を埋め込むことができる
```
service: new-service
provider: aws
functions:
  hello:
    name: ${opt:stage}-hello
    handler: handler.hello
  world:
    name: ${opt:stage}-world
    handler: handler.world
```

## Reference CloudFormation Outputs
- CloudFormation のスタック出力値は、`cf:stackName.outputKey`構文で、使用する変数のソースとして参照

```
service: new-service
provider: aws
functions:
  hello:
    name: ${cf:another-service-dev.functionPrefix}-hello
    handler: handler.hello
  world:
    name: ${cf:another-stack.functionPrefix}-world
    handler: handler.world
```

- スタック名から `functionPrefix`出力値を取得し、変数に入力
- カスタム出力を CloudFormation スタックに追加できる

```
service: another-service
provider:
  name: aws
  runtime: nodejs12.x
  region: ap-northeast-1
  memorySize: 512
functions:
  hello:
    name: ${self:custom.functionPrefix}hello
    handler: handler.hello
custom:
  functionPrefix: 'my-prefix-'
resources:
  Outputs:
    functionPrefix:
      Value: ${self:custom.functionPrefix}
      Export:
        Name: functionPrefix
    memorySize:
      Value: ${self:provider.memorySize}
      Export:
        Name: memorySize
```

- `cf.REGION:stackName.outputKey`構文を使用して、別のリージョンのCloudFormationスタックを参照できる
```
service: new-service
provider: aws
functions:
  hello:
    name: ${cf.us-west-2:another-service-dev.functionPrefix}-hello
    handler: handler.hello
  world:
    name: ${cf.ap-northeast-1:another-stack.functionPrefix}-world
    handler: handler.world
```

- CloudFormationのスタック出力のエクスポート値も参照できる

```
# Make sure you set export value in StackA.

  Outputs:
    DynamoDbTable:
      Value:
        "Ref": DynamoDbTable
      Export:
        Name: DynamoDbTable-${self:custom.stage}

# Then you can reference the export name in StackB

provider:
  environment:
    Table:
        'Fn::ImportValue': 'DynamoDbTable-${self:custom.stage}'
```

## Referencing S3 Objects
- `s3:bucketName/key`構文を使用して、サービスで使用する変数のソースとしてS3の値を参照できる
- myBucket S3バケット内のmyKeyの値を検索して変数への入力に利用
  - AWS S3のグローバル戦略のため、すべてのリージョンのバケットを追加指定せずに利用できる
```
service: new-service
provider: aws
functions:
  hello:
    name: ${s3:myBucket/myKey}-hello
    handler: handler.hello
```

## Reference Variables using the SSM Parameter Store
- SSM パラメータを変数のソースとして参照するには、`ssm:/path/to/param`構文を使用
- SSM パラメータの値が検索され、変数の入力に使用される
```
service: ${ssm:/path/to/service/id}-service
provider:
  name: aws
functions:
  hello:
    name: ${ssm:/path/to/service/myParam}-hello
    handler: handler.hello
```

- `ssm:/path/to/secureparam~true`拡張構文を使用して、SecureString型の暗号化されたSSMパラメータを参照することもできる
- 変数に SecureString の復号化された値が格納される
```
service: new-service
provider: aws
functions:
  hello:
    name: hello
    handler: handler.hello
custom:
  supersecret: ${ssm:/path/to/secureparam~true}
```

- StringList型のパラメータは、拡張構文である`ssm:/path/to/stringlistparam~split`を使用して、解決された変数を配列に分割できる

```
service: new-service
provider: aws
functions:
  hello:
    name: hello
    handler: handler.hello
custom:
  myArrayVar: ${ssm:/path/to/stringlistparam~split}
```

- `ssm.region:/path/to/param`構文を使用して、別のリージョンのSSMパラメータを参照することもできる
```
service: ${ssm.us-west-2:/path/to/service/id}-service
provider:
  name: aws
functions:
  hello:
    name: ${ssm.ap-northeast-1:/path/to/service/myParam}-hello
    handler: handler.hello
```

## Reference Variables using AWS Secrets Manager
- AWS Secrets Manager内の変数はSSMを使って参照できる
- `ssm:/aws/reference/secretsmanager/secret_ID_in_Secrets_Manager~true`構文を利用
- 変数には秘密の復号化された値が格納
```
service: new-service
provider: aws
functions:
  hello:
    name: hello
    handler: handler.hello
custom:
  supersecret: ${ssm:/aws/reference/secretsmanager/secret_ID_in_Secrets_Manager~true}
```

- AWS Secrets Managerでは、秘密を平文だけでなくJSONでも保存できる
- 変数はオブジェクトにすることもできる

```
{
  "num": 1,
  "str": "secret",
  "arr": [true, false]
}
```

- 変数は下記のように解決される

```
service: new-service
provider: aws
functions:
  hello:
    name: hello
    handler: handler.hello
custom:
  supersecret:
    num: 1
    str: secret
    arr:
      - true
      - false
```

## Reference Variables in Other Files

- 他のYAMLファイルやJSONファイル内の変数を参照できる
- 他のYAMLファイル内の変数を参照するには、`${file(./myFile.yml):someProperty}`構文を利用
- 他のJSONファイルの変数を参照するには、`${file(./myFile.json):someProperty}`構文を利用
- 参照しているファイルが正しく解釈されるためには、参照しているファイルがそのファイルタイプ（YAMLであれば.yml、JSONであれば.json）に合った正しいサフィックス（拡張子）であることが重要
- カスタムプロパティで`myCustomFile.yml`ファイル全体を参照
  - サービスディレクトリへの相対パスを渡す必要がある
  - `schedule`プロパティなど、特定のプロパティを要求することもできる
```
# myCustomFile.yml
globalSchedule: rate(10 minutes)
```

```
# serverless.yml
service: new-service
provider: aws
custom: ${file(../myCustomFile.yml)} # You can reference the entire file
functions:
  hello:
    handler: handler.hello
    events:
      - schedule: ${file(../myCustomFile.yml):globalSchedule} # Or you can reference a specific property
  world:
    handler: handler.world
    events:
      - schedule: ${self:custom.globalSchedule} # This would also work in this case
```

```
myevents:
  - schedule:
      rate: rate(1 minute)
```

```
{
  "myevents": [
    {
      "schedule": {
        "rate": "rate(1 minute)"
      }
    }
  ]
}
```

- ソースファイルの種類に応じて、構文を選択

```
functions:
  hello:
    handler: handler.hello
    events: ${file(../myCustomFile.yml):myevents}
```

```
functions:
  hello:
    handler: handler.hello
    events: ${file(../myCustomFile.json):myevents}
```

## Reference Variables in Javascript Files
- JavaScriptファイルを参照して、動的なデータを変数に追加することができる
- 参照には、名前付きまたは名前なしのエクスポートを使用できる
  - エクスポートされた`someModule`を`myFile.js`で利用するには、`{file(./myFile.js):someModule}`と記述
  - 名前を付けずにエクスポートする場合は`${file(./myFile.js)}`と記述
  - 関数をエクスポートする場合、第一引数は設定内容を含むServerlessオブジェクトへの参照となる

```
// scheduleConfig.js
module.exports.rate = 'rate(10 minutes)';
```

```
// config.js
module.exports = serverless => {
  serverless.cli.consoleLog('You can access Serverless config and methods as well!');

  return {
    property1: 'some value',
    property2: 'some other value',
  };
};
```

```
# serverless.yml
service: new-service
provider: aws

custom: ${file(../config.js)}

functions:
  hello:
    handler: handler.hello
    events:
      - schedule: ${file(../scheduleConfig.js):rate} # Reference a specific module
```

- オブジェクトを返して特定のプロパティを参照することもできる

```
# serverless.yml
service: new-service
provider: aws
functions:
  scheduledFunction:
    handler: handler.scheduledFunction
    events:
      - schedule: ${file(../myCustomFile.js):schedule.ten}
```

```
// myCustomFile.js
module.exports.schedule = () => {
  // Code that generates dynamic data
  return {
    ten: 'rate(10 minutes)',
    twenty: 'rate(20 minutes)',
    thirty: 'rate(30 minutes)',
  };
};
```

- ユースケースで動的/非同期データソース(DynamoDB、APIコールなど)を扱う必要がある場合は、変数の値として解決されるPromiseを返すこともできる

```
# serverless.yml
service: new-service
provider: aws
functions:
  scheduledFunction:
    handler: handler.scheduledFunction
    events:
      - schedule: ${file(../myCustomFile.js):promised}
```

```
// myCustomFile.js
module.exports.promised = () => {
  // Async code that fetches the rate config...
  return Promise.resolve('rate(10 minutes)');
};
```

- ヘルパーではAWS SDKを呼び出してアカウントの詳細を取得することができる

```
// myCustomFile.js
const { STS } = require('aws-sdk');
const sts = new STS();

module.exports.getAccountId = async () => {
  // Checking AWS user details
  const { Account } = await sts.getCallerIdentity().promise();
  return Account;
};
```

```
# serverless.yml
service: new-service
provider: aws
custom:
  accountId: ${file(../myCustomFile.js):getAccountId}
```

## Multiple Configuration Files
- `serverless.yml`ファイルに多くのカスタムリソースを追加するとファイル全体が肥大化する可能性があるので、構文を使用して分割できる

```
resources:
  Resources: ${file(cloudformation-resources.json)}
```

- 複数のリソースファイルを使用するには、配列を使用できる

```
resources:
  - Resources:
      ApiGatewayRestApi:
        Type: AWS::ApiGateway::RestApi

  - ${file(resources/first-cf-resources.yml)}
  - ${file(resources/second-cf-resources.yml)}

  - Outputs:
      CognitoUserPoolId:
      Value:
        Ref: CognitoUserPool
```

- cloudformationの各ファイルは、Resources エンティティで始まる必要がある

```
Resources:
  Type: 'AWS::S3::Bucket'
  Properties:
    BucketName: some-bucket-name
```

## Nesting Variable References
- 他の変数に基づいて特定の変数を参照することができる

```
service: new-service
provider: aws
custom:
  myFlexibleArn: ${env:${opt:stage}_arn}

functions:
  hello:
    handler: handler.hello
```

## Overwriting Variables
- 別のソースからの変数が欠けている場合でも、特定のソースからのデフォルト値を使用できる

```
service: new-service
provider:
  name: aws
  stage: dev
custom:
  myStage: ${opt:stage, self:provider.stage}
  myRegion: ${opt:region, 'us-west-1'}
  myCfnRole: ${opt:role, false}
  myLambdaMemory: ${opt:memory, 1024}

functions:
  hello:
    handler: handler.hello
```

## Using Custom Variable Syntax
- `${xxx}`変数の構文がCloudFormationの機能と衝突する可能性がある
  - `provider.variableSyntax`プロパティに正規表現を設定することで、デフォルトの`${xxx}`構文を上書きするカスタム構文を提供できる
- 変数構文のデフォルトの正規表現を上書きする
  - 変数を定義する際には、`${}`の代わりに`${{{}}`を使う
```
service: new-service

provider:
  name: aws
  runtime: nodejs12.x
  variableSyntax: "\\${{([ ~:a-zA-Z0-9._@\\'\",\\-\\/\\(\\)]+?)}}" # notice the double quotes for yaml to ignore the escape characters!
#  variableSyntax: "\\${((?!AWS)[ ~:a-zA-Z0-9._@'\",\\-\\/\\(\\)]+?)}" # Use this for allowing CloudFormation Pseudo-Parameters in your serverless.yml -- e.g. ${AWS::Region}. All other Serverless variables work as usual.

custom:
  myStage: ${{opt:stage}}
```

## Migrating serverless.env.yml
https://www.serverless.com/framework/docs/providers/aws/guide/variables#migrating-serverlessenvyml

## Pseudo Parameters Reference
```
Resources:
  - 'Fn::Join':
      - ':'
      - - 'arn:aws:logs'
        - Ref: 'AWS::Region'
        - Ref: 'AWS::AccountId'
        - 'log-group:/aws/lambda/*:*:*'
```

## Read String Variable Values as Boolean Values
- 確実にブール値が返されるようにするには、文字列変数の値をブール値として読み込む

```
provider:
  tracing:
    apiGateway: ${strToBool(${ssm:API_GW_DEBUG_ENABLED})}
```

```
${strToBool(true)} => true
${strToBool(false)} => false
${strToBool(0)} => false
${strToBool(1)} => true
${strToBool(2)} => Error
${strToBool(null)} => Error
${strToBool(anything)} => Error
```
