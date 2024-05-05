require 'aws-sdk-sqs'
require 'redis'

def execute(event:, context:)
  event['Records'].map do |record|
    begin
      process_record(record)
    rescue => e
      puts "Error: #{e.message}"
      puts e.backtrace.join("\n")
    end
  end
end

def process_record(record)
  redis = Redis.new(host: 'redis', port: 6379, reconnect_attempts: 3)
  key = record['body']
  redis.multi do
    if redis.exists(key)
      value = redis.get(key)
      redis.del(key)

      begin
        puts "Message: #{record.inspect}"
        puts "Message Body: #{record['body']}"
        puts "Message Attributes: #{message_attributes(record).inspect}"
      rescue => e
        redis.set(key, value)
        puts "Error: #{e.message}"
        puts e.backtrace.join("\n")
      end
    end
  end
end

def message_attributes(record)
  record['messageAttributes'].map do |key, value|
    [key, value['stringValue']]
  end.to_h
end
