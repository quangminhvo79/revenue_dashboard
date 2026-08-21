require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    total_cost: Field::Number,
    area: Field::String,
    datetime: Field::DateTime,
    status: Field::String,
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    user
    total_cost
    area
    datetime
    status
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    user
    total_cost
    area
    datetime
    status
  ].freeze

  FORM_ATTRIBUTES = %i[
    user
    total_cost
    area
    datetime
    status
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
