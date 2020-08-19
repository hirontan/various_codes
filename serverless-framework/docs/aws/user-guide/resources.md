# AWS - Resources

## Configuraions
- デプロイするすべてのステージは、1つのAWS CloudFormationスタックになる
- AWS Lambda関数とそのイベント設定が定義されている場所

```
# serverless.yml

service: usersCrud
provider: aws
functions:

resources: # CloudFormation template syntax
  Resources:
    usersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: usersTable
        AttributeDefinitions:
          - AttributeName: email
            AttributeType: S
        KeySchema:
          - AttributeName: email
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

- 意図的に拡張するには、`resources.extensions`を利用

## AWS CloudFormation Resource Reference
- 標準パターン：`{Function Name}{Cloud Formation Resource Type}{Resource Name}{SequentialID, instanceId or Random String}`
  - `Function Name`：関数名が変更されたときに再作成されるリソースのオプション。`function bound`とも呼ばれる
  - `Cloud Formation Resource Type`：ex) S3Bucket
  - `Resource Name`：特定のリソースの識別子、例えばS3バケットの場合は設定されたバケット名。
  - `SequentialID、instanceId、またはRandom String`：オプションのSequentialID、ServerlessのinstanceId（${sls:instanceId}でアクセス可能）、識別するためのランダムRandom Stringを追加

- この命名法に従う
  - 例外：`S3 Bucket`、関数をデプロイするために利用

https://www.serverless.com/framework/docs/providers/aws/guide/resources#aws-cloudformation-resource-reference


## Override AWS CloudFormation Resource
- 特定のCloudFormationリソースをオーバーライドして、独自のオプションを適用できる
  - 拡張子は`resources.extensions`セクションに配置

- リソースをオーバーライドする際に、normalizedFunctionNameには2つの注意点があある
  - 大文字で開始
  - `-`はDash、`_`はUnderscoreに変更
```
functions:
  write-post:
    handler: handler.writePost
    events:
      - http:
          method: post
          path: ${self:service}/api/posts/new
          cors: true

resources:
  extensions:
    WriteDashPostLogGroup:
      Properties:
        RetentionInDays: '30'
```

https://www.serverless.com/framework/docs/providers/aws/guide/resources#override-aws-cloudformation-resource



