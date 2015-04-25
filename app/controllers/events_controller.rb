class EventsController < ApplicationController
  def whatwedo
  end

  def team
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save && @event.get_seatgeek_results_total > 0
      @event.get_seatgeek_results
      redirect_to @event
    elsif @event.save
      flash.now[:notice] = 'No results found'
      render :new
    else
      render :new
    end
  end

  def update
    @event = Event.find(params[:id])
    @event.update_attributes(event_params)
    if @event.get_seatgeek_results_total > 0
      @event.get_seatgeek_results
      redirect_to @event
    else
      flash.now[:notice] = 'No results found'
      render :new
    end
  end

  def show
    @event = Event.find(params[:id])
    @tickets = @event.tickets
  end

  private
    def event_params
      params.require(:event).permit(:name, :date)
    end
end
