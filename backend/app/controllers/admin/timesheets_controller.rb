module Admin
  class TimesheetsController < Admin::ApplicationController
    private

    def scoped_resource
      based_scoped = policy_scope(super)

      based_scoped = based_scoped.where(shift_id: params[:shift_id]) if params[:shift_id].present?
      based_scoped = based_scoped.where(user_id: params[:user_id]) if params[:user_id].present?

      based_scoped
    end
  end
end
