class YelpApi
  attr_reader :client

  def initialize
    Yelp.client.configure do |config|
      config.consumer_key = ENV['yelp_id']
      config.consumer_secret = ENV['yelp_secret']
      config.token = ENV['yelp_token']
      config.token_secret = ENV['yelp_token_secret']
    end
    @client = Yelp.client
  end

  def search_venues(category, limit, lat, long)
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
    client.search_by_coordinates(coordinates, params)
  end

end