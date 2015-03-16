class Ticket < ActiveRecord::Base
  belongs_to :event

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
end
