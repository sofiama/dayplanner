require 'net/http'
require 'json'

class User < ActiveRecord::Base
  def to_params
    {'refresh_token' => refresh_token,
    'client_id' => ENV['GOOGLE_ID'],
    'client_secret' => ENV['GOOGLE_SECRET'],
    'grant_type' => 'refresh_token' }
  end

  def request_token_from_google
    url = URI('https://accounts.google.com/o/oauth2/token')
    Net::HTTP.post_form(url, self.to_params)
  end

  def refresh!
    response = request_token_from_google
    data = JSON.parse(response.body)
    update_attributes(
      access_token: data['access_token'],
      expires_at: Time.now + (data['1800'].to_i).seconds)
  end

  def expired?
    expires_at < Time.now
  end

  def fresh_token
    refresh! if expired?
    access_token
  end

  # def get_google_calendar
  #   client = Google::APIClient.new
  #   client.authorization.refresh_token = app.carer.google_auth_refresh_token
  #   client.authorization.access_token = app.carer.google_auth_token
  #   if client.authorization.refresh_token && client.authorization.expired?
  #     client.authorization.fetch_access_token!
  #   end
  #   service = client.discovered_api('calendar', 'v3')
  #   @result = client.execute(:api_method => service.calendar_list.list)
  # end
  
end
