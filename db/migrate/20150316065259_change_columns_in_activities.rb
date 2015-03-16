class ChangeColumnsInActivities < ActiveRecord::Migration
  def change
    add_column :activities, :categories, :text
    add_column :activities, :distance, :integer
    add_column :activities, :ticket_id, :integer 
    remove_column :activities, :event_id
  end
end
