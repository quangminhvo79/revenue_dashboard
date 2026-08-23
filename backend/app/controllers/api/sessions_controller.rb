module Api
  class SessionsController < Devise::SessionsController
    REFRESH_TOKEN_TTL = 30.days
    REFRESH_TOKEN_COOKIE = :refresh_token

    skip_before_action :verify_authenticity_token, raise: false
    respond_to :json

    def create
      self.resource = warden.authenticate!(auth_options.merge(store: false))
      sign_in(resource_name, resource, store: false)
      issue_refresh_token_cookie(resource)
      respond_with resource
    end

    def me
      if current_user
        render json: { user: current_user.as_json(only: [ :id, :email ]) }, status: :ok
      else
        render json: { message: "Please login" }, status: 401
      end
    end

    def refresh
      raw_token = cookies.encrypted[REFRESH_TOKEN_COOKIE]
      render json: { message: "Please login" }, status: 401 and return if raw_token.blank?

      token = RefreshToken.find_by(token_digest: RefreshToken.digest(raw_token))

      if token.blank? || token.revoked? || token.expired?
        clear_refresh_token_cookie
        render json: { message: "Please login" }, status: 401
        return
      end

      token.revoke!
      access_token, _payload = Warden::JWTAuth::UserEncoder.new.call(
        token.user, :user, nil
      )

      issue_refresh_token_cookie(token.user)
      render json: { access_token: access_token }, status: :ok
    end

    private

    def issue_refresh_token_cookie(user)
      raw_token = SecureRandom.hex(32)
      user.refresh_tokens.create!(
        token_digest: RefreshToken.digest(raw_token),
        expires_at: REFRESH_TOKEN_TTL.from_now
      )

      cookies.encrypted[REFRESH_TOKEN_COOKIE] = {
        value: raw_token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,
        expires: REFRESH_TOKEN_TTL.from_now,
        path: "/api"
      }
    end

    def clear_refresh_token_cookie
      cookies.delete(REFRESH_TOKEN_COOKIE, path: "/api")
    end

    def respond_with(resource, _opts = {})
      render json: {
        user: resource.as_json(only: [ :id, :email ]),
        access_token: request.env["warden-jwt_auth.token"]
      }, status: :ok
    end

    def respond_to_on_destroy(**)
      if (raw_token = cookies.encrypted[REFRESH_TOKEN_COOKIE])
        RefreshToken.find_by(token_digest: RefreshToken.digest(raw_token))&.revoke!
      end
      clear_refresh_token_cookie
      head :no_content
    end
  end
end
