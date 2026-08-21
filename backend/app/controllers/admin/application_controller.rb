# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    include Pundit::Authorization

    before_action :authenticate_user!

    rescue_from Pundit::NotAuthorizedError, with: :deny_access
    rescue_from Administrate::NotAuthorizedError, with: :deny_access

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end

    private

    def authorized_action?(resource, action_name)
      policy(resource).public_send("#{pundit_action_name(action_name)}?")
    end

    def pundit_action_name(action_name)
      case action_name.to_s
      when "new" then "create"
      when "edit" then "update"
      else action_name.to_s
      end
    end

    def deny_access
      redirect_to root_path, alert: "You are not authorized to perform this action."
    end
  end
end
