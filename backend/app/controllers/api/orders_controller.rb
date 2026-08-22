module Api
  class OrdersController < Api::ApplicationController
    before_action :authenticate_user!

    def index
      authorize Order

      @orders = Order.completed
    end
  end
end
