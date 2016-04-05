require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end
  
  test "Failed Login" do
    user=User.new
    user.username="123"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    
    user.save
    assert user.save
    assert user.valid?
    check=user.authenticate("1234567")
    assert !check 
  end
  
  test "Successful Login" do
    user=User.new
    user.username="123"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0

    user.save
    assert user.save
    assert user.valid?
    check=user.authenticate("123456")
    assert check 
  end

end
