require "administrate/base_dashboard"

class TimesheetDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    shift: Field::BelongsTo,
    user: Field::BelongsTo,
    work_date: Field::DateTime,
    wage_at_time: Field::Number,
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    shift
    user
    work_date
    wage_at_time
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    shift
    user
    work_date
    wage_at_time
  ].freeze

  FORM_ATTRIBUTES = %i[
    shift
    user
    work_date
    wage_at_time
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
