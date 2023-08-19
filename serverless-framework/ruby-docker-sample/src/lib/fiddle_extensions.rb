# frozen_string_literal: true

require "fiddle/import"

module FiddleExtensions
  extend Fiddle::Importer
  dlload '/opt/lib/libmysqlclient.so.18'
end
