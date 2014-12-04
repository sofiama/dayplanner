module Slug
  extend ActiveSupport::Concern

  def slugify
    self.downcase.gsub(" ","-")
  end
end