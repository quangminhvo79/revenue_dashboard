FactoryBot.define do
  factory :timesheet do
    association :user
    association :shift

    work_date { Date.current }
  end
end
