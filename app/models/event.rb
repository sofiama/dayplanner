require 'open-uri'
require 'json'

class Event < ActiveRecord::Base
  # attr_accessor :name, :date
  attr_accessor :results

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
    # binding.pry
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

      event[:lat] = e["venue"]["location"]["lat"]
      event[:long] = e["venue"]["location"]["lon"]
      
      event[:venue_name] = e["venue"]["name"]
      event[:venue_loc] = e["venue"]["display_location"]
      
      all_events << event
    end

    all_events
  end

end
