class Order < ApplicationRecord
  belongs_to :user

  enum :status, {
    pending: "pending",
    completed: "completed",
  }, default: :pending

  enum :area, {
    pos: "pos",
    eatclub: "eatclub",
  }, default: :pos

  validates :status, inclusion: { in: statuses.keys }
  validates :area, inclusion: { in: areas.keys }
  validates :total_cost, :date, presence: true
end
