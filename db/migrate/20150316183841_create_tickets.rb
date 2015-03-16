class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :title
      t.datetime :date
      t.string :venue_name
      t.string :venue_loc
      t.string :address
      t.string :lat
      t.string :long
      t.string :url
      t.string :img_url
      t.integer :event_id

      t.timestamps
    end
  end
end
