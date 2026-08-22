class Shift < ApplicationRecord

  has_many :timesheets

  validates :name, :wage, presence: true
  validates :wage, numericality: { greater_than: 0 }
end
