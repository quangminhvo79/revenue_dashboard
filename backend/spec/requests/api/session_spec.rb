require "rails_helper"

RSpec.describe "Api::Sessions", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/login" do
    let(:params) do
      {
        user: {
          email: user.email,
          password: "password123"
        }
      }
    end

    context "with valid credentials" do
      it "returns user and access token" do
        post "/api/login", params: params

        expect(response).to have_http_status(:ok)

        json = response.parsed_body

        expect(json["user"]["id"]).to eq(user.id)
        expect(json["user"]["email"]).to eq(user.email)
        expect(json["access_token"]).to be_present
      end

      it "issues a refresh token cookie" do
        expect_any_instance_of(Api::SessionsController)
          .to receive(:issue_refresh_token_cookie)
          .with(user)

        post "/api/login", params: params
      end
    end

    context "with invalid credentials" do
      let(:params) do
        {
          user: {
            email: user.email,
            password: "wrong-password"
          }
        }
      end

      it "returns unauthorized" do
        post "/api/login", params: params

        expect(response).to have_http_status(:unauthorized)
      end

      it "does not issue a refresh token cookie" do
        expect_any_instance_of(Api::SessionsController)
          .not_to receive(:issue_refresh_token_cookie)

        post "/api/login", params: params
      end
    end
  end

  describe "GET /api/me" do
    context "when user is authenticated" do
      let(:access_token) do
        Warden::JWTAuth::UserEncoder
          .new
          .call(user, :user, nil)
          .first
      end

      it "returns current user" do
        get "/api/me",
          headers: {
            "Authorization" => "Bearer #{access_token}"
          }

        expect(response).to have_http_status(:ok)

        json = response.parsed_body

        expect(json["user"]["id"]).to eq(user.id)
        expect(json["user"]["email"]).to eq(user.email)
      end
    end

    context "when user is not authenticated" do
      it "returns unauthorized" do
        get "/api/me"

        expect(response).to have_http_status(:unauthorized)

        expect(response.parsed_body["message"]).to eq("Please login")
      end
    end
  end

  describe "POST /api/refresh" do
    let(:raw_token) { SecureRandom.hex(32) }

    let!(:refresh_token) do
      create(
        :refresh_token,
        user: user,
        token_digest: RefreshToken.digest(raw_token),
        expires_at: 30.days.from_now
      )
    end

    context "when refresh token is valid" do
      before do
        allow_any_instance_of(Api::SessionsController)
          .to receive(:cookies)
          .and_return(
            double(
              encrypted: {
                refresh_token: raw_token
              }
            )
          )
      end

      it "returns a new access token" do
        post "/api/refresh"

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["access_token"]).to be_present
      end

      it "revokes the refresh token" do
        post "/api/refresh"

        expect(refresh_token.reload).to be_revoked
      end

      it "issues a new refresh token" do
        expect_any_instance_of(Api::SessionsController)
          .to receive(:issue_refresh_token_cookie)
          .with(user)

        post "/api/refresh"
      end
    end

    context "when refresh token is missing" do
      before do
        allow_any_instance_of(Api::SessionsController)
          .to receive(:cookies)
          .and_return(
            double(encrypted: {})
          )
      end

      it "returns unauthorized" do
        post "/api/refresh"

        expect(response).to have_http_status(:unauthorized)

        expect(response.parsed_body["message"]).to eq("Please login")
      end
    end

    context "when refresh token is revoked" do
      before do
        refresh_token.update!(revoked_at: Time.current)

        allow_any_instance_of(Api::SessionsController)
          .to receive(:cookies)
          .and_return(
            double(
              encrypted: {
                refresh_token: raw_token
              }
            )
          )
      end

      it "returns unauthorized" do
        cookie = double(:cookie)
        allow_any_instance_of(Api::SessionsController)
          .to receive(:cookies)
          .and_return(cookie)
        expect(cookie).to receive(:encrypted).and_return({})

        post "/api/refresh"

        expect(response).to have_http_status(:unauthorized)
      end

      it "clears the refresh token cookie" do
        expect_any_instance_of(Api::SessionsController)
          .to receive(:clear_refresh_token_cookie)

        post "/api/refresh"
      end
    end

    context "when refresh token is expired" do
      before do
        refresh_token.update!(expires_at: 1.day.ago)

        allow_any_instance_of(Api::SessionsController)
          .to receive(:cookies)
          .and_return(
            double(
              encrypted: {
                refresh_token: raw_token
              }
            )
          )
      end

      it "returns unauthorized" do
        cookie = double(:cookie)
        allow_any_instance_of(Api::SessionsController)
          .to receive(:cookies)
          .and_return(cookie)
        expect(cookie).to receive(:encrypted).and_return({})

        post "/api/refresh"

        expect(response).to have_http_status(:unauthorized)
      end

      it "clears the refresh token cookie" do
        expect_any_instance_of(Api::SessionsController)
          .to receive(:clear_refresh_token_cookie)

        post "/api/refresh"
      end
    end
  end

  describe "DELETE /api/logout" do
    it "clears the refresh token cookie" do
      expect_any_instance_of(Api::SessionsController)
        .to receive(:clear_refresh_token_cookie)

      delete "/api/logout"
    end
  end
end
