class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :name
      t.string :url
      t.string :address
      t.string :lat
      t.string :long
      t.integer :event_id

      t.timestamps
    end
  end
end
