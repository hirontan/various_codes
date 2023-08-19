# frozen_string_literal: true

require_relative 'fiddle_extensions'

require 'mysql2'
require 'active_record'

class Comment < ActiveRecord::Base
end

def connection
  {
    adapter: 'mysql2',
    host: 'db',
    username: 'root',
    password: 'root',
    database: 'sample_development',
    port: '3306'
  }
end

connection_info = connection
ActiveRecord::Base.establish_connection(connection_info)
