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
  roles["manager"] => ["manager1@example.com", "manager2@example.com"],
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
