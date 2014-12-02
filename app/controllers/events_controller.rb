class EventsController < ApplicationController
  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to @event
    else
      render :new
    end
  end

  def show
    @event = Event.find(params[:id])
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    @event.update(:name => params[:name])
    @event.update(:date => params[:datetime])
    @event.update(:lat => params[:lat])
    @event.update(:long => params[:long])
    @event.update(:taxonomies => params[:taxonomies])
    # raise params
    redirect_to @event#showpage
  end

  private
    def event_params
      params.require(:event).permit(:name, :date)
    end
end
