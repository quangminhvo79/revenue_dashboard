module Admin
  class RolesController < Admin::ApplicationController
    private

    def scoped_resource
      policy_scope(super)
    end
  end
end
