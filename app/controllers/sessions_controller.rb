class SessionsController < ApplicationController

  def new
  end

  def create
    @auth = request.env["omniauth.auth"]
    #binding.pry

    if @auth["provider"] == "google_oauth2"
      @user = User.create(
        access_token: @auth['credentials']['token'],
        refresh_token: @auth['refresh_token'],
        expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime
        )
      redirect_to event_results_path
    elsif (@auth["provider"] == "facebook")
      user = User.create_with_omniauth(env["omniauth.auth"])
      session[:user_id] = user.id
      redirect_to event_results_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end

