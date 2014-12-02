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
    day = self.date.strftime('%d')
    "#{month}+#{day}"
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
      event[:lat] = e["venue"]["location"]["lat"]
      event[:long] = e["venue"]["location"]["lon"]
      all_events << event
    end

    all_events
  end

end
