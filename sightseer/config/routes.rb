Rails.application.routes.draw do


  get 'sessions/create'
  get 'sessions/destroy'

  resources :users
  
  
  get 'admin' => 'admin#index'
  get 'logout' => 'sessions#destroy'

  resources :admin do
  resources :users
  end

  controller :sessions do
    get 'login' => :new
    post 'login' => :create
    delete 'logout' => :destroy
  end
 
  root 'sessions#create', as: 'index'

end
