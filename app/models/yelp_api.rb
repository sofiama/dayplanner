class YelpApi

  @@client ||= Yelp::Client.new ({
      consumer_key: ENV['YELP_ID'],
      consumer_secret: ENV['YELP_SECRET'],
      token: ENV['YELP_TOKEN'],
      token_secret: ENV['YELP_TOKEN_SECRET']
      })

  def self.search_venues(category, limit, lat, long)
    params = {
      limit: limit,
      category_filter: category,
      sort: 0,
      radius_filter: 805
    }
    coordinates = {
      latitude: lat,
      longitude: long
    }
    @@client.search_by_coordinates(coordinates, params)
  end

end