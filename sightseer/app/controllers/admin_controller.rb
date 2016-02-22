class AdminController < ApplicationController
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
      params.require(:user).permit(:username, :firstname, :lastname, :email, :admin_type)

    end
end
