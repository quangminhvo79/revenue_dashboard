module Api
  class DashboardController < Api::ApplicationController
    before_action :authenticate_user!

    DEFAULT_PERIOD = 7

    def show
      authorize :dashboard, :show?

      current_period_orders = fetch_order_by_period(Date.current)
      previous_period_orders = fetch_order_by_period(Date.current - 7.days)

      render json: {
        current_period: {
          # orders: current_period_orders,
          revenue: revenues(current_period_orders),
          total_covers: current_period_orders.sum(:covers)
        },
        previous_period: {
          # orders: previous_period_orders,
          revenue: revenues(previous_period_orders),
          total_covers: previous_period_orders.sum(:covers)
        }
      }
    end

    private

    def fetch_order_by_period(end_date)
      start_date = end_date - DEFAULT_PERIOD.days
      Order.where(date: (start_date..end_date))
    end

    def revenues(orders)
      orders.select('sum(total_cost) as total_cost, area').group(:area)
    end
  end
end
