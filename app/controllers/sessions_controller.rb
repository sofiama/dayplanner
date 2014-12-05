class SessionsController < ApplicationController

  def new
  end

  def create
    @auth = request.env["omniauth.auth"]
    # binding.pry
    @user = User.create(
      access_token: @auth['credentials']['token'],
      refresh_token: @auth['refresh_token'],
      expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime
      )

    # redirect_to event_results_path
    # @token = @auth["credentials"]["token"]
    # client = Google::APIClient.new
    # client.authorization.access_token = @token
    # service = client.discovered_api('calendar', 'v3')
    # @result = client.execute(
    #   :api_method => service.calendar_list.list,
    #   :parameters => {},
    #   :headers => {'Content-Type' => 'application/json'})
  end

end
