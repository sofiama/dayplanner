class AddUrlAndImageUrlToEvents < ActiveRecord::Migration
  def change
    add_column :events, :url, :string
    add_column :events, :img_url, :string
  end
end
