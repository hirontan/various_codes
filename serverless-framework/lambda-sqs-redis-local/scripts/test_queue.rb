#! /usr/bin/env ruby

require 'aws-sdk-sqs'

# SQSクライアントの作成
sqs_client = Aws::SQS::Client.new(
  region: 'ap-northeast-1',
  endpoint: 'http://localhost:59324', # ローカルのエンドポイント
  credentials: Aws::Credentials.new('dummy', 'dummy')
)

# SQSキューにメッセージを送信
queue_url = 'http://localhost:59324/000000000000/my-queue-development' # ローカルのキューURL
sqs_client.send_message(queue_url: queue_url, message_body: 'Test message')
