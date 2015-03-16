class Ticket < ActiveRecord::Base
  belongs_to :event
  has_many :activities

  def date_display
  # Date.parse(self.date.to_s)
    date.strftime('%a') + ' ' + date.strftime('%b') + ' ' + date.strftime('%-d') + ', ' + date.strftime('%Y')
  end

  def time_display
    # Time.parse(self.date.to_s).strftime('%l:%M %p')
    DateTime.parse(self.date.to_s).strftime('%Y-%m-%dT%H:%M:%S%z')
  end

  def time
    Time.parse(self.date.to_s).strftime('%l:%M %p')
  end

  def get_yelp_restaurants
    result = YelpApi.search_venues('restaurants', 5, self.lat, self.long)
    get_yelp_venue_results(result)
  end

  def get_yelp_nightlife
    result = YelpApi.search_venues('nightlife', 5, self.lat, self.long)
    get_yelp_venue_results(result)
  end

  def get_yelp_venue_results(result)
    result.businesses.each do |r|
      self.activities.create(
        :name => r.name,
        :url => r.url,
        :address => r.location.display_address.join('/'),
        :lat => r.location.coordinate.latitude.to_s,
        :long => r.location.coordinate.longitude.to_s,
        :categories => r.categories.map{|i| i.first}.join(','),
        :distance => r.distance.to_s
       )
    end  
  end

  def get_foursquare_sights
    ll = "#{self.lat},#{self.long}"
    result = FoursquareApi.new.search(ll)
    
    result["response"]["venues"].each do |r|
      self.activities.create(
        :name => r["name"], 
        :url => "https://foursquare.com/v/#{r["name"].downcase.gsub(" ","-")}/#{r["id"]}",
        :address => r["location"]["formattedAddress"].join('/'), 
        :lat => r["location"]["lat"].to_s, 
        :long => r["location"]["lng"].to_s, 
        :categories => r["categories"][0]["name"], 
        :distance => r["location"]["distance"].to_s #in meters      
      )
    end
  end
end
