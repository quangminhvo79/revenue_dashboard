Rails.application.routes.draw do
  namespace :admin do
      resources :users
      resources :roles
      resources :orders do
        post :mark_all_completed, on: :collection
      end

      resources :timesheets
      resources :shifts

      root to: "users#index"
    end
  devise_for :users, failure_app: ApiFailureApp

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  namespace :api do
    devise_scope :user do
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      get "me", to: "sessions#me"
      post "refresh", to: "sessions#refresh"
    end

    resources :orders, only: [:index]
    resource :dashboard, only: [], controller: "dashboard" do
      get :weekly_revenue
    end
  end
  # Defines the root path route ("/")
  root to: "home#index"
end
