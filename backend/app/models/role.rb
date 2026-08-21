class Role < ApplicationRecord
  has_many :users

  enum :name, {
    admin: "admin",
    manager: "manager",
    staff: "staff",
  }, default: :staff
end
