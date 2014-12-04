class SessionsController < ApplicationController
  def new
  end

  def create     
    @event = Event.find(params[:event_id])    
    @auth = request.env["omniauth.auth"]
    # binding.pry
    @token = Token.create(
      access_token: @auth['credentials']['token'],
      refresh_token: @auth['refresh_token'],
      expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime
      )
  end
end
