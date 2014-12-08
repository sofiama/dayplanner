class SessionsController < ApplicationController

  def new
  end

  def create
    @auth = request.env["omniauth.auth"]
    @origin = request.env["omniauth.origin"]
    @params = request.env["omniauth.params"].except("utf8", "commit")
    # binding.pry
    
    @user = User.create(
      access_token: @auth['credentials']['token'],
      # refresh_token: @auth['refresh_token'],
      # expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime,
      email: @auth["info"]["email"],
      event_id: request.env["omniauth.origin"].split('/')[4]
      )

    @event = Event.find(@origin.split('/')[4])
    @event.user_id = @user.id
    
    if @event.save
      # render :nothing => true
      client = Google::APIClient.new
      client.authorization.access_token = @user.access_token
      service = client.discovered_api('calendar', 'v3')

      main_event = {
        :api_method => service.events.quick_add,
        :parameters => 
          { 'calendarId' => 'primary',
            'text' => "#{@event.name} on #{@event.date_display} #{@event.time}"}
      }

      # client.execute(main_event)

      @params.each do |k,v|
        name = v.split('/').first
        time = v.split('/').last
        activity = {
          :api_method => service.events.quick_add,
          :parameters => {
            'calendarId' => 'primary', 
            'text' => "#{name} on #{@event.date_display} #{time}"
          }
        }
        client.execute(activity)
      end

      short_name = @event.name.downcase[0..4]
      if !@params.has_key?(short_name)
        client.execute(main_event)
      end

      # @event.google_event_id = result.data.id
      # @event.save
      redirect_to(@origin)
    else
      render :nothing => true
    end
  
    # redirect_to(@origin)
  end

end
