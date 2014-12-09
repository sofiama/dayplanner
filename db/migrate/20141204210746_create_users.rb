class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :access_token
      t.string :refresh_token
      t.datetime :expires_at
      t.string :provider
      t.string :uid
      t.string :name

      t.timestamps
    end
  end
end
