require 'open-uri'
require 'json'
include Slug

class Event < ActiveRecord::Base
  has_one :user
  has_many :activities

  def name_normalizer
    self.name.gsub(' ', '+')
  end

  def date_normalizer
    month = self.date.strftime('%b').downcase
    date = self.date.strftime('%d')
    "#{month}+#{date}"
  end

  def get_seatgeek_info
    url = "http://api.seatgeek.com/2/events?q=#{self.name_normalizer}+on+#{self.date_normalizer}"
    @results = JSON.load(open(url))
  end

  def get_results
    self.get_seatgeek_info
    all_events = []

    @results["events"].each do |e|
      event = {}

      event[:title] = e["title"]

      event[:datetime_local] = e["datetime_local"]
      # date in sun dec 7, 2014 format
      date = Date.parse(e["datetime_local"])
      event[:date] = date.strftime('%a') + ' ' + date.strftime('%b') + ' ' + date.strftime('%-d') + ', ' + date.strftime('%Y')

      # in 12hr AM:PM format
      event[:local_time] = Time.parse(e["datetime_local"]).strftime('%l:%M %p')

      #lat and long
      #binding.pry
      event[:lat] = e["venue"]["location"]["lat"]
      event[:long] = e["venue"]["location"]["lon"]

      #venue name and loc
      event[:venue_name] = e["venue"]["name"]
      event[:venue_loc] = e["venue"]["display_location"]

      #event type in an array
      event[:taxonomies] = []
      e["taxonomies"].each do |e|
        event[:taxonomies] << e["name"]
      end

      all_events << event
    end

    all_events
  end

  def date_display
    date = Date.parse(self.date.to_s)
    # date.strftime('%a') + ' ' + date.strftime('%b') + ' ' + date.strftime('%-d') + ', ' + date.strftime('%Y')
  end

  def time_display
    # Time.parse(self.date.to_s).strftime('%l:%M %p')
    DateTime.parse(self.date.to_s).strftime('%Y-%m-%dT%H:%M:%S%z')
  end

  def time
    Time.parse(self.date.to_s).strftime('%l:%M %p')
  end

  # foursquare stuff !!!
  def get_foursquare_sights
    ll = "#{self.lat},#{self.long}"
    result = FoursquareApi.new.search(ll)

    all_venues = []

    result["response"]["venues"].each do |r|
      venue = {}
      venue[:name] = r["name"] if r.keys.include?("name")

      ### STORES ADDRESS AS AN ARRAY ###
      venue[:address] = r["location"]["formattedAddress"] if r["location"].keys.include?("formattedAddress")
      venue[:cats] = r["categories"][0]["name"] if r["categories"][0].keys.include?("name")
      venue[:hours] = r["hours"] if r.keys.include?("hours")
      venue[:distance] = r["location"]["distance"]  if r["location"].keys.include?("distance") #in meters
      venue[:lat] = r["location"]["lat"] if r["location"].keys.include?("lat")
      venue[:long] = r["location"]["lng"] if r["location"].keys.include?("lng")
      venue[:here_now] = r["hereNow"]["summary"] if r["hereNow"].keys.include?("summary")
      #venue[:url] = r["shortUrl"] if r.keys.include?("shortUrl") #never provided so...
      venue[:url] = "https://foursquare.com/v/#{r["name"].downcase.gsub(" ","-")}/#{r["id"]}"

      all_venues << venue
    end
    all_venues
  end


  # YELP stuff !!!
  def get_yelp_restaurants
    result = YelpApi.search_venues('restaurants', 5, self.lat, self.long)
    get_yelp_venue_results(result)
    # get_yelp_venue_r(result)
  end

  def get_yelp_nightlife
    result = YelpApi.search_venues('nightlife', 3, self.lat, self.long)
    get_yelp_venue_results(result)
    # get_yelp_venue_r(result)
  end

  def get_yelp_venue_results(result)
    all_venues = []
      #binding.pry
    result.businesses.each do |r|
      venue = {}

      venue[:name] = r.name
      venue[:url] = r.url
      venue[:address] = r.location.display_address
      venue[:phone] = r.phone if r.keys.include?(:phone)
      venue[:lat] = r.location.coordinate.latitude
      venue[:long] = r.location.coordinate.longitude
      venue[:cats] = r.categories.map{|i| i.first}
      # binding.pry
      venue[:rating] = r.rating
      venue[:review_count] = r.review_count
      venue[:is_closed] = r.is_closed
      venue[:distance] = r.distance #in meters
      all_venues << venue
         #binding.pry
    end
    all_venues
  end


  # def get_yelp_restaurants_ar
  #   result = YelpApi.search_venues('restaurants', 5, self.lat, self.long)
  #   get_yelp_venue_ar(result)
  # end

  # def get_yelp_nightlife_ar
  #   result = YelpApi.search_venues('nightlife', 3, self.lat, self.long)
  #   get_yelp_venue_ar(result)
  # end

  # def get_yelp_venue_ar(result)
  #   result.businesses.each do |r|
  #     self.activities.create(
  #       :event_id => self.id,
  #       :name => r.name, 
  #       :address => r.location.display_address.join('/'),
  #       :lat => r.location.coordinate.latitude,
  #       :long => r.location.coordinate.longitude,
  #       :url => r.url
  #     )
  #   end
  # end

  def get_rand_options
    options = []

    options << get_yelp_restaurants.sample
    options.last[:title] = 'Food'

    options << get_yelp_nightlife.sample
    options.last[:title] = 'Nightlife'

    options << get_foursquare_sights.sample
    options.last[:title] = 'Sights'

    options
  end

end
