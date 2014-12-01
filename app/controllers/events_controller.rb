class EventsController < ApplicationController
  def index
    @event = Event.new
  end

  def create
    @event = Event.create(event_params)
  end

  private
    def event_params
      params.require(:event).permit(:name, :date)
    end
end
