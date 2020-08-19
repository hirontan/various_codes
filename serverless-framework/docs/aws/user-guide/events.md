# AWS - Events
https://www.serverless.com/framework/docs/providers/aws/guide/events/

- 関数を実行するトリガー
  - S3 bucketへのアップロード
  - SNS Topic
  - API Gateway経由で作成されたHTTPエンドポイント

## Configuration

```
# 'functions' in serverless.yml
functions:
  createUser: # Function name
    handler: handler.createUser # Reference to file handler.js & exported function 'createUser'
    events: # All events associated with this function
      - http:
          path: users/create
          method: post
```

- AWSでサポートされているものであれば、関数ごとに複数のEventを設定できる

```
# 'functions' in serverless.yml
functions:
  createUser: # Function name
    handler: handler.users # Reference to file handler.js & exported function 'users'
    events: # All events associated with this function
      - http:
          path: users/create
          method: post
      - http:
          path: users/update
          method: put
      - http:
          path: users/delete
          method: delete
```

## PathParameters
```
# 'functions' in serverless.yml
functions:
  createUser: # Function name
    handler: handler.users # Reference to file handler.js & exported function 'users'
    events: # All events associated with this function
      - http:
          path: users/{id}
          method: get
```

## Types
- 詳細はAWS Eventsにて
  - https://www.serverless.com/framework/docs/providers/aws/events/

