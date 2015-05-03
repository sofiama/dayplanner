class SessionsController < ApplicationController

  def new
  end

  def create
    @auth = request.env["omniauth.auth"]

    if @auth["provider"] == "google_oauth2"

      @origin = request.env["omniauth.origin"]
      @params = request.env["omniauth.params"].except("utf8", "commit")
      # binding.pry

      @user = User.create(
        access_token: @auth['credentials']['token'],
        # refresh_token: @auth['refresh_token'],
        # expires_at: Time.at(@auth['credentials']['expires_at']).to_datetime,
        email: @auth["info"]["email"],
        #event_id: request.env["omniauth.origin"].split('/')[4]
        )

      @event = Event.find(@origin.split('/')[4])
      @ticket = Ticket.find(@origin.split('/')[6])
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
              'text' => "#{@ticket.title} on #{@ticket.date_display} #{@ticket.time}"}
        }

        # client.execute(main_event)

        @params.each do |k,v|
          name = v.split('/').first
          time = v.split('/').last
          activity = {
            :api_method => service.events.quick_add,
            :parameters => {
              'calendarId' => 'primary',
              'text' => "#{name} on #{@ticket.date_display} #{time}"
            }
          }
          client.execute(activity)
        end

        short_name = @ticket.title.downcase[0..4]
        if !@params.has_key?(short_name)
          client.execute(main_event)
        end

        # @event.google_event_id = result.data.id
        # @event.save
        redirect_to(@origin)
        # render :nothing => true
      else
        render :nothing => true
      end

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

