module Api
  class ApplicationController < ::ApplicationController
    include Pundit::Authorization
    skip_before_action :verify_authenticity_token, raise: false

    rescue_from Pundit::NotAuthorizedError, with: :deny_access

    respond_to :json

    private

    def deny_access
      render json: {
        message: "You are not authorized to perform this action."
      }, status: :forbidden
    end
  end
end
