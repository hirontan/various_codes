# IAM

## The Default IAM Role
- デフォルトでは、1つのIAM Roleはサービス内のすべてのLambda関数で共有
- デフォルトでは、Lambda関数はCloudWatchログの作成と書き込みの権限がある
- VPC設定がある場合、VPCリソースと通信するためにデフォルトのAWS AWSLambdaVPCAccessExecutionRoleが関連付けられる
- サービス全体のロールに特定の権利を追加するには、`provider.iamRoleStatements`で定義
  - CloudFormation テンプレートにマージされるので、Join、Ref、その他の CloudFormation メソッドや機能を使用できる
```
service: new-service

provider:
  name: aws
  iamRoleStatements:
    - Effect: 'Allow'
      Action:
        - 's3:ListBucket'
      Resource:
        Fn::Join:
          - ''
          - - 'arn:aws:s3:::'
            - Ref: ServerlessDeploymentBucket
    - Effect: 'Allow'
      Action:
        - 's3:PutObject'
      Resource:
        Fn::Join:
          - ''
          - - 'arn:aws:s3:::'
            - Ref: ServerlessDeploymentBucket
            - '/*'
```

- サービス全体の Role にマネージドポリシーを追加できる

```
service: new-service

provider:
  name: aws
  iamManagedPolicies:
    - 'some:aws:arn:xxx:*:*'
    - 'someOther:aws:arn:xxx:*:*'
    - { 'Fn::Join': [':', ['arn:aws:iam:', { Ref: 'AWS::AccountId' }, 'some/path']] }
```

## Custom IAM Roles
- カスタムロールを定義すると、全体のロール設定を行う必要がある
- プロバイダレベルで定義した iamRoleStatements は適用されない
- Lambdasのログやストリームイベントに対応するパーミッションを提供する必要がある
- カスタムロールを定義して、プロバイダや個々の関数単位で適用できる
- プロバイダで定義すると、ロール値によって参照されるロールは、独自のロールが宣言されていないLambdaのデフォルトロールになる
  - 個々の関数にロール属性を定義すると、プロバイダレベルで宣言されたロールが上書きされる
  - サービス内のすべての関数にロールが割り当てられている場合（プロバイダレベルのロール宣言、個別の宣言、またはその2つが混在している場合）、デフォルトのロールとポリシーは生成されず、cloudformationテンプレートに追加されない

- role属性には、ロールの論理名、ロールのARN、またはロールのARNで解決するオブジェクトの値を指定できる
  - 宣言`{ function. { role: 'myRole' } }`は`{ 'Fn::GetAtt'. ['myRole', 'Arn'] }`となる
  - `{ function: {role: 'an:aws:arn:xxx:*:*' } }`のように宣言できる

##### One Custom IAM Role For All Functions

```
service: new-service

provider:
  name: aws
  # declare one of the following...
  role: myDefaultRole                                                  # must validly reference a role defined in the service
  role: arn:aws:iam::0123456789:role//my/default/path/roleInMyAccount  # must validly reference a role defined in your account
  role:                                                                # must validly resolve to the ARN of a role you have the rights to use
    Fn::GetAtt:
      - myRole
      - Arn

functions:
  func0: # will assume 'myDefaultRole'
    ... # does not define role
  func1: # will assume 'myDefaultRole'
    ... # does not define role

resources:
  Resources:
    myDefaultRole:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/default/path/
        RoleName: MyDefaultRole # required if you want to use 'serverless deploy --function' later on
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        # note that these rights are needed if you want your function to be able to communicate with resources within your vpc
        ManagedPolicyArns:
          - arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow # note that these rights are given in the default policy and are required if you want logs out of your lambda(s)
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource:
                    - 'Fn::Join':
                      - ':'
                      -
                        - 'arn:aws:logs'
                        - Ref: 'AWS::Region'
                        - Ref: 'AWS::AccountId'
                        - 'log-group:/aws/lambda/*:*:*'
                -  Effect: "Allow"
                   Action:
                     - "s3:PutObject"
                   Resource:
                     Fn::Join:
                       - ""
                       - - "arn:aws:s3:::"
                         - "Ref" : "ServerlessDeploymentBucket"
```

##### Custom IAM Rokes For Each Function
```
service: new-service

provider:
  name: aws
  ... # does not define role

functions:
  func0:
    role: myCustRole0
    ...
  func1:
    role: myCustRole1
    ...

resources:
  Resources:
    myCustRole0:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/cust/path/
        RoleName: MyCustRole0
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource:
                    - 'Fn::Join':
                      - ':'
                      -
                        - 'arn:aws:logs'
                        - Ref: 'AWS::Region'
                        - Ref: 'AWS::AccountId'
                        - 'log-group:/aws/lambda/*:*:*'
                - Effect: Allow
                  Action:
                    - ec2:CreateNetworkInterface
                    - ec2:DescribeNetworkInterfaces
                    - ec2:DetachNetworkInterface
                    - ec2:DeleteNetworkInterface
                  Resource: "*"
    myCustRole1:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/cust/path/
        RoleName: MyCustRole1
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow # note that these rights are given in the default policy and are required if you want logs out of your lambda(s)
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource:
                    - 'Fn::Join':
                      - ':'
                      -
                        - 'arn:aws:logs'
                        - Ref: 'AWS::Region'
                        - Ref: 'AWS::AccountId'
                        - 'log-group:/aws/lambda/*:*:*'
                -  Effect: "Allow"
                   Action:
                     - "s3:PutObject"
                   Resource:
                     Fn::Join:
                       - ""
                       - - "arn:aws:s3:::"
                         - "Ref" : "ServerlessDeploymentBucket"
```

##### A Custom Default Role & Custom Function Roles

```
service: new-service

provider:
  name: aws
  role: myDefaultRole

functions:
  func0:
    role: myCustRole0
    ...
  func1:
    ... # does not define role

resources:
  Resources:
    myDefaultRole:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/default/path/
        RoleName: MyDefaultRole
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow # note that these rights are given in the default policy and are required if you want logs out of your lambda(s)
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource:
                    - 'Fn::Join':
                      - ':'
                      -
                        - 'arn:aws:logs'
                        - Ref: 'AWS::Region'
                        - Ref: 'AWS::AccountId'
                        - 'log-group:/aws/lambda/*:*:*'
                -  Effect: "Allow"
                   Action:
                     - "s3:PutObject"
                   Resource:
                     Fn::Join:
                       - ""
                       - - "arn:aws:s3:::"
                         - "Ref" : "ServerlessDeploymentBucket"
    myCustRole0:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/cust/path/
        RoleName: MyCustRole0
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource:
                    - 'Fn::Join':
                      - ':'
                      -
                        - 'arn:aws:logs'
                        - Ref: 'AWS::Region'
                        - Ref: 'AWS::AccountId'
                        - 'log-group:/aws/lambda/*:*:*'
                - Effect: Allow
                  Action:
                    - ec2:CreateNetworkInterface
                    - ec2:DescribeNetworkInterfaces
                    - ec2:DetachNetworkInterface
                    - ec2:DeleteNetworkInterface
                  Resource: "*"
```



