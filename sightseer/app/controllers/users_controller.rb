class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  skip_before_action :authorize, only: [:new, :create, :index] 

  def index
    @users = User.all
  end


  def show
  end


  def new
    @user = User.new
  end


  def edit
   @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    @user.admin_type ||= false
    respond_to do |format|
      if @user.save
        format.html { redirect_to login_url, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end


  def update
    respond_to do |format|
      if @user.update(user_params)
        
        if $isadmin == true
              if @user.admin_type == true 
              format.html { redirect_to admin_index_url, notice: ' Admin user successfully Edited.' }
              else 
              format.html { redirect_to admin_index_url, notice: ' User successfully edited by Admin' }
              end
        format.json { render :show, status: :ok, location: @user }
        else
        format.html { redirect_to users_url, notice: 'Your profile was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
        end
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end



  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to admin_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private

    def set_user
      @user = User.find(params[:id])
    end
  

    def user_params
      params.require(:user).permit(:username, :firstname, :lastname, :email, :password, :password_confirmation, :admin_type)
    end
end
