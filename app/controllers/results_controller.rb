class ResultsController < ApplicationController
  def index
    @event = Event.find(params[:event_id])
    
    @food =  @event.get_yelp_restaurants
    @night = @event.get_yelp_nightlife

  end
end
