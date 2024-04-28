require 'aws-sdk-sqs'

def execute(event:, context:)
  begin
    puts "Event: #{event.inspect}"
  rescue StandardError => e
    puts "Error: #{e.message}"
    puts e.backtrace.join("\n")
  end
end
