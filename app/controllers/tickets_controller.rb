class TicketsController < ApplicationController
  def update
    @ticket = Ticket.find(params[:id])
    @ticket.get_yelp_restaurants
    @ticket.get_yelp_nightlife
    @ticket.get_foursquare_sights
    redirect_to event_tickets_path
  end

  def show
    @ticket = Ticket.find(params[:id])
    @activities = @ticket.activities
    @food = @activities.first(5)
    @night = @activities.first(5)
    @sights = @activities.last(5)
  end
end
