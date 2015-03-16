class ChangeColumnsInActivities < ActiveRecord::Migration
  def change
    add_column :activities, :categories, :string
    add_column :activities, :distance, :string
    add_column :activities, :ticket_id, :integer 
    remove_column :activities, :event_id
  end
end
