require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should get new" do
    get :new
    assert_response :success
  end
  
  test "Create User" do
    user=User.new
    user.username="123"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    assert user.valid?
  end
end
