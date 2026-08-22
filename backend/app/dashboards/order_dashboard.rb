require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    total_cost: Field::Number,
    area: Field::Select.with_options(collection: ::Order.areas.keys),
    date: Field::DateTime,
    covers: Field::Number,
    status: Field::Select.with_options(collection: ::Order.statuses.keys),
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    user
    total_cost
    area
    date
    covers
    status
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    user
    total_cost
    area
    date
    covers
    status
  ].freeze

  FORM_ATTRIBUTES = %i[
    user
    total_cost
    area
    date
    covers
    status
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
