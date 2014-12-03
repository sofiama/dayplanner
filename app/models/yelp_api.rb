class YelpApi

  @@client ||= Yelp::Client.new ({
      consumer_key: ENV['yelp_id'],
      consumer_secret: ENV['yelp_secret'],
      token: ENV['yelp_token'],
      token_secret: ENV['yelp_token_secret']
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