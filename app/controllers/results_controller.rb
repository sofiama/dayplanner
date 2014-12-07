class ResultsController < ApplicationController
  def index
    @event = Event.find(params[:event_id])
    @random = @event.get_rand_options
    @food =  @event.get_yelp_restaurants
    @night = @event.get_yelp_nightlife
    @sights = @event.get_foursquare_sights

    if @event.user_id != nil
      @user = User.find(@event.user_id)
    end

  end
end
