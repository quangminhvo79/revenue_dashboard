FactoryBot.define do
  factory :refresh_token do
    association :user
    token_digest { RefreshToken.digest(SecureRandom.hex(32)) }
    expires_at { 30.days.from_now }
  end
end
