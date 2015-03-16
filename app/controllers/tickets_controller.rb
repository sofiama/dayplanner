class TicketsController < ApplicationController
  def update
    @ticket = Ticket.find(params[:id])
    @ticket.get_yelp_restaurants
    @ticket.get_yelp_nightlife
    @ticket.get_foursquare_sights
    redirect_to event_ticket_path
  end

  def show
    @ticket = Ticket.find(params[:id])
    @activities = @ticket.activities
    @food = @activities.first(5)
    @night = @activities.first(5)
    @sights = @activities.last(5)

    gon.mainEvent = @ticket
    gon.mainEventLL = [@ticket.lat, @ticket.long] #bc long is keyword
    gon.food = @food
    gon.night = @night
    gon.sights = @sights

    @event = @ticket.event

    if @event.user_id != nil
      @user = User.find(@event.user_id)
    end
  end
end
