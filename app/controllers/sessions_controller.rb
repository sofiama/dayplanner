class SessionsController < ApplicationController

  def new
  end

  def create
    # binding.pry
    @auth = request.env["omniauth.auth"]
    # binding.pry

    

    @user = User.create(
      access_token: @auth['credentials']['token'],
      refresh_token: @auth['refresh_token'],
      expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime,
      email: @auth["info"]["email"],
      event_id: request.env["omniauth.origin"].split('/')[4]
      )

    @event = Event.find(request.env["omniauth.origin"].split('/')[4])
    @event.user_id = @user.id
    @event.save
  
    # @event_id = @user.id
    redirect_to(request.env["omniauth.origin"])
    # redirect_to event_results_path(@user.id)
  end

end
