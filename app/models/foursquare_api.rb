require 'yaml'

class FoursquareApi

  attr_reader :client

  def initialize

    @client = Foursquare2::Client.new(:client_id => ENV['FOURSQUARE_ID'], :client_secret => ENV['FOURSQUARE_SECRET'])
  end

  def search(ll)
    url = "https://api.foursquare.com/v2/venues/search?client_id=#{ENV['FOURSQUARE_ID']}&client_secret=#{ENV['FOURSQUARE_SECRET']}&ll=#{ll}&radius=4025&categoryId=4deefb944765f83613cdba6e,4bf58dd8d48988d12d941735&limit=5&v=20140806&m=foursquare"

    JSON.load(open(url))

    #Second call for venue details to https://api.foursquare.com/v2/venues/VENUE_ID
  end


end