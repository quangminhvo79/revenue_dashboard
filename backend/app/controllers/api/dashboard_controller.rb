module Api
  class DashboardController < Api::ApplicationController
    before_action :authenticate_user!

    DEFAULT_PERIOD = 7

    def show
      authorize :dashboard, :show?

      current_period_orders = order_by_period(Date.current)
      previous_period_orders = order_by_period(Date.current - 7.days)

      current_period_timesheets = timesheet_by_period(Date.current)
      previous_period_timesheets = timesheet_by_period(Date.current - 7.days)

      render json: {
        current_period: {
          number_of_orders: current_period_orders.count,
          revenue: revenues(current_period_orders),
          total_covers: current_period_orders.sum(:covers),
          labor_cost: current_period_timesheets.sum(:wage_at_time)
        },
        previous_period: {
          number_of_orders: previous_period_orders.count,
          revenue: revenues(previous_period_orders),
          total_covers: previous_period_orders.sum(:covers),
          labor_cost: previous_period_timesheets.sum(:wage_at_time)
        }
      }
    end

    private

    def order_by_period(end_date)
      start_date = end_date - DEFAULT_PERIOD.days
      Order.where(date: (start_date..end_date))
    end

    def timesheet_by_period(end_date)
      start_date = end_date - DEFAULT_PERIOD.days
      Timesheet.where(work_date: (start_date..end_date))
    end

    def revenues(orders)
      orders.select('sum(total_cost) as total_cost, area').group(:area)
    end
  end
end
