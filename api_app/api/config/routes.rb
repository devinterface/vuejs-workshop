Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' }, defaults: { format: 'json' } do
    namespace :v1 do
      post :user_token, to: 'user_token#create'

      resources :posts do
        resources :comments, only: [:create, :destroy]
      end
    end
  end
end
