class SessionsController < ApplicationController

  def new
  end

  def create
    @auth = request.env["omniauth.auth"]
    @origin = request.env["omniauth.origin"]

    @user = User.create(
      access_token: @auth['credentials']['token'],
      refresh_token: @auth['refresh_token'],
      expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime,
      email: @auth["info"]["email"],
      event_id: request.env["omniauth.origin"].split('/')[4]
      )

    @event = Event.find(@origin.split('/')[4])
    @event.user_id = @user.id
    
    if @event.save
      render :nothing => true
      google_event = {
        'summary' => @event.name,
        # 'location' => @event.location,
        'start' => @event.date
      }
      client = Google::APIClient.new
      client.authorization.access_token = @user.access_token
      service = client.discovered_api('calendar', 'v3')

      result = client.execute(
        :api_method => service.events.insert,
        :parameters => {'calendarId' => @user.email, 'sendNotifications' => true},
        :body => JSON.dump(google_event),
        :headers => {'Content-Type' => 'application/json'})
      @event.google_event_id = result.data.id
      @event.save
      # redirect_to(@origin)
    else
      render :nothing => true
    end
  
    # redirect_to(@origin)
  end

end
