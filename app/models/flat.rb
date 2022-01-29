class Flat < ApplicationRecord
  geocoded_by :address
  before_validation :geocode, if: :will_save_change_to_address?
  validates :latitude, presence: true
end
