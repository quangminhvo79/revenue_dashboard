# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

DEFAULT_PASSWORD = "password123"

roles = Role.names.keys.index_with { |name| Role.find_or_create_by!(name: name) }

{
  roles["admin"] => ["admin@example.com"],
  roles["staff"] => ["staff1@example.com", "staff2@example.com", "staff3@example.com"],
}.each do |role, emails|
  emails.each do |email|
    User.find_or_create_by!(email: email) do |user|
      user.password = DEFAULT_PASSWORD
      user.password_confirmation = DEFAULT_PASSWORD
      user.role = role
    end
  end
end

users = User.all.to_a
month_start = Date.new(2026, 8, 1)
month_end = Date.new(2026, 8, 31)

Order.where(date: month_start.beginning_of_day..month_end.end_of_day).destroy_all

(month_start..month_end).each do |day|
  rand(3..8).times do
    Order.create!(
      user: users.sample,
      total_cost: rand(50..500).to_f.round(2),
      area: Order.areas.keys.sample,
      status: Order.statuses.keys.sample,
      date: day.to_time + rand(8..22).hours + rand(0..59).minutes,
      covers: rand(1..4)
    )
  end
end

shifts = {
  "morning" => 90,
  "afternoon" => 120,
  "evening" => 150,
}.map { |name, wage| Shift.find_or_create_by!(name: name) { |shift| shift.wage = wage } }

staff_users = User.joins(:role).where(roles: { name: "staff" }).to_a

Timesheet.where(work_date: month_start.beginning_of_day..month_end.end_of_day).destroy_all

(month_start..month_end).each do |day|
  staff_users.each do |user|
    next if rand < 0.2

    Timesheet.create!(
      user: user,
      shift: shifts.sample,
      work_date: day
    )
  end
end
