# Allow the Next.js frontend (running on a different port/origin in development)
# to call this API. Add production/staging origins via ORIGINS env var when deploying.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch("CORS_ORIGINS", "http://localhost:3001").split(",")

    resource "/api/*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      credentials: true
  end
end
