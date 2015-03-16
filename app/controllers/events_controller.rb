class EventsController < ApplicationController

  def home
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
      flash[:notice] = 'No results found'
      render :new
    end
  end

  def show
    @event = Event.find(params[:id])
    @tickets = @event.tickets
  end

  # def edit
  #   @event = Event.find(params[:id])
  # end

  # def update
  #   @event = Event.find(params[:id])

  #   # raise params
  #   # @event.update(:user_id => @event.id)
  #   redirect_to event_results_path(@event)
  # end

  private
    def event_params
      params.require(:event).permit(:name, :date)
    end
end
