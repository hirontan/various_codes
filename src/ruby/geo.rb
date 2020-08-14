require 'sora_geocoding'

puts SoraGeocoding.search('東京都')
coordinate = SoraGeocoding.coordinates('東京都千代田区')
latlon = coordinate[:coordinates]
puts SoraGeocoding.geohash(latlon[:lat], latlon[:lon])
