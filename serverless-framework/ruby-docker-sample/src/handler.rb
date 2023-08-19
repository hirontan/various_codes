require 'json'
require_relative 'lib/active_record_extension'

def hello(event:, context:)
  comments = Comment.all
  {
    statusCode: 200,
    body: {
      message: comments,
      input: event
    }.to_json
  }
end
