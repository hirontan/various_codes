# AWS - Functions
https://www.serverless.com/framework/docs/providers/aws/guide/functions/

## Configurations
- Serverlessサービスの全てのLambda関数は、`serverless.yml`プロパティの配下にある
- `handler`プロパティ：関数内で実行したいコードを含むファイルとモジュール
```
# serverless.yml
service: myService

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 512 # optional, in MB, default is 1024
  timeout: 10 # optional, in seconds, default is 6
  versionFunctions: false # optional, default is true
  tracing:
    lambda: true # optional, enables tracing for all functions (can be true (true equals 'Active') 'Active' or 'PassThrough')

functions:
  hello:
    handler: handler.hello # required, handler set in AWS Lambda
    name: ${opt:stage, self:provider.stage, 'dev'}-lambdaName # optional, Deployed Lambda name
    description: Description of what the lambda function does # optional, Description to publish to AWS
    runtime: python2.7 # optional overwrite, default is provider runtime
    memorySize: 512 # optional, in MB, default is 1024
    timeout: 10 # optional, in seconds, default is 6
    provisionedConcurrency: 3 # optional, Count of provisioned lambda instances
    reservedConcurrency: 5 # optional, reserved concurrency limit for this function. By default, AWS uses account concurrency limit
    tracing: PassThrough # optional, overwrite, can be 'Active' or 'PassThrough'
```

- プロパティ内に、必要な数だけ関数を追加することができる
```
# serverless.yml

service: myService

provider:
  name: aws
  runtime: nodejs12.x

functions:
  functionOne:
    handler: handler.functionOne
    description: optional description for your Lambda
  functionTwo:
    handler: handler.functionTwo
  functionThree:
    handler: handler.functionThree
```

- `functions`は、`provider`プロパティを継承できる

```
# serverless.yml
service: myService

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 512 # will be inherited by all functions

functions:
  functionOne:
    handler: handler.functionOne
```

- 関数レベルでプロパティを指定することもできる
```
# serverless.yml
service: myService

provider:
  name: aws
  runtime: nodejs12.x

functions:
  functionOne:
    handler: handler.functionOne
    memorySize: 512 # function specific
```

- `functions`は配列を指定することができるので、`functions`を別ファイルに分割できる方法もある

```
# serverless.yml
---
functions:
  - ${file(../foo-functions.yml)}
  - ${file(../bar-functions.yml)}
```

```
# foo-functions.yml
getFoo:
  handler: handler.foo
deleteFoo:
  handler: handler.foo
```

## Permissions
- `provider.iamRoleStatements`プロパティで設定できる

### ex1
```
# serverless.yml
service: myService

provider:
  name: aws
  runtime: nodejs12.x
  iamRoleStatements: # permissions for all of your functions can be set here
    - Effect: Allow
      Action: # Gives permission to DynamoDB tables in a specific region
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: 'arn:aws:dynamodb:us-east-1:*:*'

functions:
  functionOne:
    handler: handler.functionOne
    memorySize: 512
```

### ex2
```
# serverless.yml
service: myService
provider:
  name: aws
  iamRoleStatements:
    - Effect: 'Allow'
      Action:
        - 's3:ListBucket'
      # You can put CloudFormation syntax in here.  No one will judge you.
      # Remember, this all gets translated to CloudFormation.
      Resource: { 'Fn::Join': ['', ['arn:aws:s3:::', { 'Ref': 'ServerlessDeploymentBucket' }]] }
    - Effect: 'Allow'
      Action:
        - 's3:PutObject'
      Resource:
        Fn::Join:
          - ''
          - - 'arn:aws:s3:::'
            - 'Ref': 'ServerlessDeploymentBucket'
            - '/*'

functions:
  functionOne:
    handler: handler.functionOne
    memorySize: 512
```

### ex3
- roleプロパティにIAM Role ARNを追加することで、既存のIAMロールを使用する
```
# serverless.yml
service: new-service
provider:
  name: aws
  role: arn:aws:iam::YourAccountNumber:role/YourIamRole
```

##  VPC Configuration
- 関数の`VPC`を構築するために必要な`securityGroupIds`と`subnetIds`のプロパティが含まれている必要がある
- `serverless deploy`を実行すると一緒に作成される
```
# serverless.yml
service: service-name
provider: aws

functions:
  hello:
    handler: handler.hello
    vpc:
      securityGroupIds:
        - securityGroupId1
        - securityGroupId2
      subnetIds:
        - subnetId1
        - subnetId2
```

- サービス内のすべての関数に`VPC`設定を適用したい場合は、上位レベルの`provider`オブジェクトに設定を追加
- 関数レベルでこれらのサービスレベルの設定を上書きする

```
# serverless.yml
service: service-name
provider:
  name: aws
  vpc:
    securityGroupIds:
      - securityGroupId1
      - securityGroupId2
    subnetIds:
      - subnetId1
      - subnetId2

functions:
  hello: # this function will overwrite the service level vpc config above
    handler: handler.hello
    vpc:
      securityGroupIds:
        - securityGroupId1
        - securityGroupId2
      subnetIds:
        - subnetId1
        - subnetId2
  users: # this function will inherit the service level vpc config above
    handler: handler.users
```

### VPC IAM permissions
- Lambda関数実行ロールは、Elastic Network Interfaces (ENI)の作成、記述、削除の権限を持っている必要がある
- VPC設定が提供されている場合、デフォルトの`AWSLambdaVPCAccessExecutionRole`がLambda実行ロールに関連付けらる
- カスタムロールが提供されている場合は、適切な`ManagedPolicyArns`を必ず含める

### VPC Lambda Internet Access
- デフォルトでは、VPC内でLambda関数を実行するとインターネットアクセスが失われ、AWS内の一部のリソースが利用できなくなることがある
  - VPC内で実行しているLambda関数でS3リソースやDynamoDBリソースを利用できるようにするためには、VPCエンドポイントを作成する必要があります
  - Kinesisストリームなどの他のサービスを利用可能にするためには、Lambdaを実行するために使用するVPCに対して、使用されているサブネット内にNAT Gatewayを設定する必要がある

## Environment Variables
- serverless.yml内の特定の関数に環境変数の設定を追加する
  - 関数の設定に環境オブジェクトのプロパティを追加し、キーと値のペアを含める

```
# serverless.yml
service: service-name
provider: aws

functions:
  hello:
    handler: handler.hello
    environment:
      TABLE_NAME: tableName
```

- サービス内のすべての関数に環境変数の設定を適用したい場合は、上位の`provider`オブジェクトに設定を追加する
  - 関数レベルと`provider`レベルの両方で定義されている場合は、関数レベルが優先される

```
# serverless.yml
service: service-name
provider:
  name: aws
  environment:
    SYSTEM_NAME: mySystem
    TABLE_NAME: tableName1

functions:
  hello:
    # this function will have SYSTEM_NAME=mySystem and TABLE_NAME=tableName1 from the provider-level environment config above
    handler: handler.hello
  users:
    # this function will have SYSTEM_NAME=mySystem from the provider-level environment config above
    # but TABLE_NAME will be tableName2 because this more specific config will override the default above
    handler: handler.users
    environment:
      TABLE_NAME: tableName2
```

## Tags
- tags設定を使用することで、関数に`key`/`value`タグを追加できる
- AWSコンソールに表示され、タグで関数をグループ化したり、共通のタグを持つ関数を簡単に見つけることができる

```
functions:
  hello:
    handler: handler.hello
    tags:
      foo: bar
```

- サービス内のすべての機能にタグ設定を適用したい場合は、`provider`オブジェクトに設定を追加する
  - 関数レベルと`provider`レベルの両方で定義されている場合は、関数レベルが優先される

```
# serverless.yml
service: service-name
provider:
  name: aws
  tags:
    foo: bar
    baz: qux

functions:
  hello:
    # this function will inherit the service level tags config above
    handler: handler.hello
  users:
    # this function will overwrite the foo tag and inherit the baz tag
    handler: handler.users
    tags:
      foo: quux
```

## Layers
- `layers`設定を使用すると、関数でラムダレイヤーを使用することが可能

```
functions:
  hello:
    handler: handler.hello
    layers:
      - arn:aws:lambda:region:XXXXXX:layer:LayerName:Y
```

## Log Group Resources
- デフォルトでは`Lambda`用のLogGroupsを作成
- `disableLogs: true`を設定することで、デフォルトの動作を無効にできる

```
functions:
  hello:
    handler: handler.hello
    disableLogs: true
```

## Versioning Deployed Functions
- デフォルトでは、デプロイごとに関数のバージョンを作成
- `provider`レベルのオプション`versionFunctions`を設定することで、デフォルトを無効にできる

```
provider:
  versionFunctions: false
```

## Dead Letter Queue（DLQ）
- リトライも失敗した場合、`Dead Letter Queue`と呼ばれる、失敗したリクエストをSNSトピックやSQSキューに送信する機能がある
- SNS Topicと`onError`構成パラメータを使用して、DLQを設定
  - 注意: 1つの関数につき`onError`構成を指定できるのは1つ

### DLQ with SNS
-  SNS Topicはあらかじめ作成して、関数レベルで`arn`として記述

```
service: service

provider:
  name: aws
  runtime: nodejs12.x

functions:
  hello:
    handler: handler.hello
    onError: arn:aws:sns:us-east-1:XXXXXX:test # Ref, Fn::GetAtt and Fn::ImportValue are supported as well
```

### DLQ with SQS
- `Dead Letter Queues`は`SNS Topic`と`SQS`の両方をサポートしていますが、現在`onError`設定では`SNS Topic`のみをサポート

## KMS Keys
- AWS Key Management Service (KMS)を利用して、環境変数を暗号化
- `awsKmsKeyArn`設定で、KMSキーを定義できる

```
service:
  name: service-name
  awsKmsKeyArn: arn:aws:kms:us-east-1:XXXXXX:key/some-hash

provider:
  name: aws
  environment:
    TABLE_NAME: tableName1

functions:
  hello: # this function will OVERWRITE the service level environment config above
    handler: handler.hello
    awsKmsKeyArn: arn:aws:kms:us-east-1:XXXXXX:key/some-hash
    environment:
      TABLE_NAME: tableName2
  goodbye: # this function will INHERIT the service level environment config above
    handler: handler.goodbye
```

### Secrets using environment variables and KMS
- https://docs.aws.amazon.com/lambda/latest/dg/welcome.html

## Asynchronous invocation
- 関数を非同期に呼び出したい場合

### Destinations
- サービスや他のターゲット（外部管理Lambda、EventBridge イベントバス、SQS キュー、SNS Topic）と一緒にデプロイした他のLambdaで、そのARNを介してアドレスを指定できる

```
functions:
  asyncHello:
    handler: handler.asyncHello
    destinations:
      onSuccess: otherFunctionInService
      onFailure: arn:aws:sns:us-east-1:xxxx:some-topic-name
```

### Maximum Event Age and Maximum Retry Attempts
- `maximumEventAge`：60秒から6時間の間の値
- `maximumRetryAttempts`：0～2の間の値

```
functions:
  asyncHello:
    handler: handler.asyncHello
    maximumEventAge: 7200
    maximumRetryAttempts: 1
```

