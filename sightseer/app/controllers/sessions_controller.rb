class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:new, :create, :index] 
  
  def new
  end

  def create
    user = User.find_by(name: params[:name])
    if user and user.authenticate(params[:password])
        session[:user_id] = user.id
        session[:user_name] = user.name
        redirect_to user, alert: "Sucessfully Logged in"
    else
        redirect_to login_url, alert:"Wrong Username or Password!"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_url, alert:"Successfully logged out"
  end
end
