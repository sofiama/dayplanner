class ChangeIntToStringInActivities < ActiveRecord::Migration
  def change
    change_column :activities, :distance, :string
  end
end
