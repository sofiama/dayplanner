class Event < ActiveRecord::Base
  # attr_accessor :name, :date

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
    results = JSON.load(open(url))
    binding.pry
  end


end
