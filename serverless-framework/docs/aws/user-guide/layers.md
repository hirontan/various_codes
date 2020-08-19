# AWS - Layers

## Configurations
- `serverless.yml`の`layers`プロパティを利用

```
# serverless.yml
service: myService

provider:
  name: aws

layers:
  hello:
    path: layer-dir # required, path to layer contents on disk
    name: ${opt:stage, self:provider.stage, 'dev'}-layerName # optional, Deployed Lambda layer name
    description: Description of what the lambda layer does # optional, Description to publish to AWS
    compatibleRuntimes: # optional, a list of runtimes this layer is compatible with
      - python3.8
    licenseInfo: GPLv3 # optional, a string specifying license information
    # allowedAccounts: # optional, a list of AWS account IDs allowed to access this layer.
    #   - '*'
    # note: uncommenting this will give all AWS users access to this layer unconditionally.
    retain: false # optional, false by default. If true, layer versions are not deleted as new ones are created
```

- プロパティ内では、最大5つのレイヤーを追加

```
# serverless.yml

service: myService

provider:
  name: aws

layers:
  layerOne:
    path: layerOne
    description: optional description for your layer
  layerTwo:
    path: layerTwo
  layerThree:
    path: layerThree
```

- パッケージング設定は、グローバルパッケージプロパティから継承できる

```
# serverless.yml
service: myService

provider:
  name: aws

package:
  exclude:
    - layerSourceTarball.tar.gz

layers:
  layerOne:
    path: layerOne
```

- `Layers`レベルで指定することもできる

```
# serverless.yml
service: myService

provider:
  name: aws

layers:
  layerOne:
    path: layerOne
    package:
      exclude:
        - layerSourceTarball.tar.gz
```

- あらかじめビルドされたアーカイブを指定できる
- レイヤーのパス要素を指定なし

```
# serverless.yml
service: myService

provider:
  name: aws

layers:
  layerOne:
    package:
      artifact: layerSource.zip
```

## Permissions
- `allowedAccounts`プロパティを設定することで、他のアカウントからもLayerを許可できる

```
# serverless.yml
service: myService

provider:
  name: aws

layers:
  layerOne:
    path: layerOne
    allowedAccounts:
      - 111111111111 # a specific account ID
      - 222222222222 # a different specific account ID
```

- Layerをパブリックアクセス可能に

```
# serverless.yml
service: myService

provider:
  name: aws

layers:
  layerOne:
    path: layerOne
    allowedAccounts:
      - '*' # ALL accounts!
```

## Using your layers
- 関数内に`layers`を設定できる

```
functions:
  hello:
    handler: handler.hello
    layers:
      - arn:aws:lambda:region:XXXXXX:layer:LayerName:Y
```

- 同じサービス内の関数を持つLayerを使用するには、`CloudFormation Ref`を利用
- CloudFormation テンプレート内のレイヤー名は、`TitleCased` (スペースなし) となる

```
layers:
  test:
    path: layer
functions:
  hello:
    handler: handler.hello
    layers:
      - { Ref: TestLambdaLayer }
```

