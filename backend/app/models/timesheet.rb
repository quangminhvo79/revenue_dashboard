class Timesheet < ApplicationRecord
  belongs_to :user
  belongs_to :shift

  validates :work_date, presence: true

  before_validation :set_wage_at_time

  def set_wage_at_time
    self.wage_at_time = shift.wage
  end
end
