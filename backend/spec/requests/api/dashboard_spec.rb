require "rails_helper"

RSpec.describe "Api::Dashboard", type: :request do
  describe "GET /api/dashboard/weekly_revenue" do
    let(:user) { create(:user) }

    before do
      sign_in user
    end

    context "when user is authorized" do
      before do
        allow_any_instance_of(Api::DashboardController)
          .to receive(:authorize)
          .with(:dashboard, :weekly_revenue?)
      end

      it "returns weekly revenue data" do
        end_date = Date.current

        create(
          :order,
          date: end_date,
          area: "pos",
          total_cost: 100,
          status: :completed,
          covers: 2,
          user: user
        )

        create(
          :order,
          date: end_date - 1.day,
          area: "eatclub",
          total_cost: 200,
          status: :completed,
          covers: 2,
          user: user
        )

        create(
          :timesheet,
          user: user,
          shift: create(:shift, wage: 50),
          work_date: end_date,
        )

        get "/api/dashboard/weekly_revenue"

        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json["pos"]).to eq(100)
        expect(json["eatclub"]).to eq(200)
        expect(json["total_covers"]).to eq(4)
        expect(json["labor_cost"]).to eq(50)

        expect(json["chartData"]).to be_an(Array)
        expect(json["chartData"].size).to eq(7)
      end

      it "uses the provided end_date" do
        end_date = Date.new(2026, 8, 20)

        create(
          :order,
          date: end_date,
          area: "pos",
          total_cost: 500,
          covers: 10,
          status: :completed,
          user: user
        )

        create(
          :order,
          date: end_date,
          area: "pos",
          total_cost: 500,
          covers: 10,
          user: user
        )

        get "/api/dashboard/weekly_revenue",
            params: { end_date: end_date }

        expect(response).to have_http_status(:ok)

        json = response.parsed_body

        expect(json["pos"]).to eq(500)
      end
    end

    context "when user is not authenticated" do
      before do
        sign_out user
      end

      it "returns unauthorized" do
        get "/api/dashboard/weekly_revenue"

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
