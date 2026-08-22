module Api
  class SessionsController < Devise::SessionsController
    skip_before_action :verify_authenticity_token, raise: false
    respond_to :json

    def create
      self.resource = warden.authenticate!(auth_options.merge(store: false))
      sign_in(resource_name, resource, store: false)
      respond_with resource
    end

    private

    def respond_with(resource, _opts = {})
      render json: {
        user: resource.as_json(only: [:id, :email]),
        token: request.env["warden-jwt_auth.token"]
      }, status: :ok
    end

    def respond_to_on_destroy(**)
      head :no_content
    end
  end
end
