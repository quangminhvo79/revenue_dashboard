module Admin
  class OrdersController < Admin::ApplicationController

    def mark_all_completed
      Order.update_all(status: :completed)
      flash[:notice] = "All Order updated"
    end

    private

    def scoped_resource
      policy_scope(super)
    end
  end
end
