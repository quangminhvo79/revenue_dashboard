require "administrate/base_dashboard"

class ShiftDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    name: Field::String,
    wage: Field::Number,
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    name
    wage
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    name
    wage
  ].freeze

  FORM_ATTRIBUTES = %i[
    name
    wage
  ].freeze

  COLLECTION_FILTERS = {}.freeze

  def display_resource(shift)
    shift.name.titlecase
  end
end
