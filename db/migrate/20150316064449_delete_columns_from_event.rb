class DeleteColumnsFromEvent < ActiveRecord::Migration
  def change
    remove_column :events, :lat
    remove_column :events, :long
    remove_column :events, :taxonomies
    remove_column :events, :url
    remove_column :events, :img_url
    remove_column :events, :address
  end
end
