module Api
  class DashboardController < Api::ApplicationController
    before_action :authenticate_user!, only: [:weekly_revenue]

    DEFAULT_PERIOD = 7
    WEEKDAYS = %w[Sun Mon Tue Wed Thu Fri Sat]

    def weekly_revenue
      authorize :dashboard, :weekly_revenue?

      end_date = params[:end_date].present? ? Date.parse(params[:end_date]) : Date.current
      current_period_orders = order_by_period(end_date)
      current_period_timesheets = timesheet_by_period(end_date)
      revenue_by_area = current_period_orders.group(:area).sum(:total_cost)

      render json: revenue_by_area.merge({
        total_covers: current_period_orders.sum(:covers),
        labor_cost: current_period_timesheets.sum(:wage_at_time),
        chartData: summaries_by_weekday(current_period_orders, current_period_timesheets)
      })
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

    def summaries_by_weekday(current_period_orders, current_period_timesheets)
      summaries = (0..6).map do |i|
        [WEEKDAYS[i], { weekday: WEEKDAYS[i], pos: 0, eatclub: 0, labor_cost: 0, event_impact: rand(-1..1) }]
      end.to_h

      current_period_orders.each do |order|
        summaries[WEEKDAYS[order.date.wday]][order.area.to_sym] += order.total_cost
      end
      current_period_timesheets.each do |timesheet|
        summaries[WEEKDAYS[timesheet.work_date.wday]][:labor_cost] += timesheet.wage_at_time
      end
      summaries.values
    end
  end
end
