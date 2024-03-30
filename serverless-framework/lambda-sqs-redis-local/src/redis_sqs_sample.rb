require 'aws-sdk-sqs'

def execute(event:, context:)
  sqs = Aws::SQS::Client.new(
    region: 'ap-northeast-1',
    endpoint: 'http://localstack:4566', # LocalStackのエンドポイントを指定
    credentials: Aws::Credentials.new('dummy', 'dummy')
  ) # 使用するリージョンを指定

  queue_url = ENV.fetch('AWS_QUEUE_URL')
  puts "Queue URL: #{queue_url}"

  begin
    resp = sqs.receive_message(queue_url: queue_url, max_number_of_messages: 1)

    if resp.messages.any?
      msg = resp.messages[0]
      puts "Message body: #{msg.body}"
      puts "Message ID: #{msg.message_id}"
      puts "Receipt handle: #{msg.receipt_handle}"
  
      # メッセージを削除
      sqs.delete_message(queue_url: queue_url, receipt_handle: msg.receipt_handle)
    else
      puts "No messages in the queue."
    end
  rescue StandardError => e
    puts "Error: #{e.message}"
    puts e.backtrace.join("\n")
  end
end
