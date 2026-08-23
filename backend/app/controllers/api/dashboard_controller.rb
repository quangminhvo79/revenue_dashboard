module Api
  class DashboardController < Api::ApplicationController
    before_action :authenticate_user!, only: [:show]

    DEFAULT_PERIOD = 7
    WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    def show
      authorize :dashboard, :show?

      current_period_orders = order_by_period(Date.current)
      previous_period_orders = order_by_period(Date.current - 7.days)

      current_period_timesheets = timesheet_by_period(Date.current)
      previous_period_timesheets = timesheet_by_period(Date.current - 7.days)

      render json: {
        current_period: {
          number_of_orders: current_period_orders.count,
          total_revenue_by_area: revenues(current_period_orders),
          total_revenue: current_period_orders.sum(:total_cost),
          total_covers: current_period_orders.sum(:covers),
          labor_cost: current_period_timesheets.sum(:wage_at_time),
          summaries: summaries_by_weekday(current_period_orders, current_period_timesheets)
        },
        previous_period: {
          number_of_orders: previous_period_orders.count,
          total_revenue_by_area: revenues(previous_period_orders),
          total_revenue: previous_period_orders.sum(:total_cost),
          total_covers: previous_period_orders.sum(:covers),
          labor_cost: previous_period_timesheets.sum(:wage_at_time),
          revenue_by_day: summaries_by_weekday(previous_period_orders, previous_period_timesheets)
        }
      }
    end

    def me
      render json: { success: true }
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

    def summaries_by_weekday(current_period_orders, current_period_timesheets)
      summaries = (0..6).map do |i|
        [WEEKDAYS[i], { weekday: WEEKDAYS[i], pos_revenue: 0, eatclub_revenue: 0, labor_cost: 0 }]
      end.to_h

      current_period_orders.each do |order|
        summaries[WEEKDAYS[order.date.wday]][order.area == 'pos' ? :pos_revenue : :eatclub_revenue] += order.total_cost
      end
      current_period_timesheets.each do |timesheet|
        summaries[WEEKDAYS[timesheet.work_date.wday]][:labor_cost] += timesheet.wage_at_time
      end
      summaries.values
    end

    def revenue_by_day(orders)
      orders.group_by do |order|
        order.date.wday
      end.map do |wday, orders|
        [WEEKDAYS[wday], orders.sum(&:total_cost)]
      end
    end
  end
end
