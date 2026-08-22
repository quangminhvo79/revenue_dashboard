module Admin
  class ShiftsController < Admin::ApplicationController
    private

    def scoped_resource
      policy_scope(super)
    end
  end
end
