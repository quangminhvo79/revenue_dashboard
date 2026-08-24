FactoryBot.define do
  factory :order do
    association :user

    total_cost { 100.0 }
    area { "pos" }
    date { Date.current }
    status { "pending" }
    covers { 1 }
  end
end
