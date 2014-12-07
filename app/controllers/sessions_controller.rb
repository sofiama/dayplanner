class SessionsController < ApplicationController

  def new
  end

  def create
    @auth = request.env["omniauth.auth"]
    @origin = request.env["omniauth.origin"]
    @testparams = request.env["omniauth.params"]
    @act1 = @testparams["act1_name"]
    # binding.pry
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
      # google_event = {
      #   'summary' => @event.name,
      #   # 'location' => @event.location,
      #   'start' => {'dateTime' => '2014-12-30T10:00:00.000-07:00'},
      #   'end' => {'dateTime' => '2014-12-30T10:00:00.000-08:00'}
      # }
      client = Google::APIClient.new
      client.authorization.access_token = @user.access_token
      service = client.discovered_api('calendar', 'v3')

      @event.date.to_s

      # hash = {
      #   :api_method => service.events.insert,
      #   :parameters => {'calendarId' => 'sofia.ma@gmail.com', 'sendNotifications' => true},
      #   :body => JSON.dump(google_event),
      #   :headers => {'Content-Type' => 'application/json'}
      # }
      hash_quickAdd = {
        :api_method => service.events.quick_add,
        :parameters => 
          { 'calendarId' => 'primary',
            'text' => "#{@event.name} #{@event.date}"}
      }

      hash_quickAdd1 = {
        :api_method => service.events.quick_add,
        :parameters => 
          { 'calendarId' => 'primary',
            'text' => "#{@act1} on Dec 29 10pm"}
      }

      result = client.execute(hash_quickAdd
        )

      result = client.execute(hash_quickAdd1
        )

      @event.google_event_id = result.data.id
      @event.save
      # redirect_to(@origin)
    else
      render :nothing => true
    end
  
    # redirect_to(@origin)
  end

end
