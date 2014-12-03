class ResultsController < ApplicationController
  def index
    @event = Event.find(params[:event_id])
    @random = @event.get_yelp_rand_options
    @food =  @event.get_yelp_restaurants
    @night = @event.get_yelp_nightlife
  end
end
