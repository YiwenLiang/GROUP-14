Rails.application.routes.draw do


  get 'welcome/homepage'

  get 'welcome/homepage'
    root 'welcome#homepage'

  get 'sessions/create'
  get 'sessions/destroy'

  resources :users do
  resources :admin
  resources :sessions
  end



  get 'admin' => 'admin#index'
  get 'logout' => 'sessions#destroy'

  resources :admin do
  resources :users
  resources :sessions


  end

  controller :sessions do
    get 'login' => :new
    post 'login' => :create
    delete 'logout' => :destroy
  end

  #root 'sessions#create', as: 'index'

  get 'map' => 'map#index'
  get 'map/index'

end
