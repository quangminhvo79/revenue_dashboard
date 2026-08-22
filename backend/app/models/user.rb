class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  include Devise::JWT::RevocationStrategies::JTIMatcher

  belongs_to :role

  delegate :admin?, to: :role, allow_nil: true, prefix: false
  delegate :manager?, to: :role, allow_nil: true, prefix: false
  delegate :staff?, to: :role, allow_nil: true, prefix: false
  delegate :name, to: :role, allow_nil: true, prefix: true

  before_validation :set_default_role

  private

  def set_default_role
    self.role = Role.find_by_name :staff
  end
end
