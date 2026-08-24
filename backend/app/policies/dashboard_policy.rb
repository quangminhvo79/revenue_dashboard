class DashboardPolicy < ApplicationPolicy
  attr_reader :user

  def initialize(user, _record)
    @user = user
  end

  def weekly_revenue? = user.admin?
end
