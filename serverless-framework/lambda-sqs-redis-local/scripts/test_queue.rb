#! /usr/bin/env ruby

require 'aws-sdk-sqs'
require 'redis'

# SQSクライアントの作成
sqs_client = Aws::SQS::Client.new(
  region: 'ap-northeast-1',
  endpoint: 'http://localhost:59324', # ローカルのエンドポイント
  credentials: Aws::Credentials.new('dummy', 'dummy')
)
redis = Redis.new(host: 'localhost', port: 56379, reconnect_attempts: 3)

# メッセージを送信する
redis.set 'test', { message_body: 'Test message' }.to_json

# SQSキューにメッセージを送信
queue_url = 'http://localhost:59324/000000000000/my-queue-development' # ローカルのキューURL
sqs_client.send_message(queue_url: queue_url, message_body: 'test', message_attributes: { 'message_body' => { string_value: 'Test message', data_type: 'String' } })
