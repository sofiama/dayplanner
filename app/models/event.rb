require 'open-uri'
require 'json'
include Slug

class Event < ActiveRecord::Base
  has_one :user
  has_many :tickets

  validates_presence_of :name
  validates_presence_of :date, :message => 'must be DD-MM-YYYY format'

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
    results = JSON.load(open(url))
  end

  def get_seatgeek_results_total
    self.get_seatgeek_info['meta']['total']
  end

  def get_seatgeek_results #tickets
    self.get_seatgeek_info["events"].each do |e|
      if e['venue']['country'] == 'US'
        self.tickets.create(
          :title =>  e["title"],
          :url => e["url"],
          :img_url => e['performers'].first['image'],
          :address => e['venue']['address'] + '/' + e['venue']['extended_address'],
          :date => DateTime.parse(e["datetime_local"]),
          :venue_name => e["venue"]["name"],
          :venue_loc => e["venue"]["display_location"],
          :lat => e["venue"]["location"]["lat"],
          :long => e["venue"]["location"]["lon"]
          )
      end
    end
  end

end
