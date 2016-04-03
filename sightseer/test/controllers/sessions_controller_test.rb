require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end
  
  test "Login Username exists" do
    user1 = User.new(username: '123')
    User.find_by(username: '123')
    assert_response 200
  end
  
  test "Login account exists" do
    user = User.new(:password=>"123")
    user.username="123"
    user.save
    User.find_by(username: '123').try(:authenticate, '123')
    assert_response 200
  end

end
