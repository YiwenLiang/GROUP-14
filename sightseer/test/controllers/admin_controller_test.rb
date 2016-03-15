require 'test_helper'

class AdminControllerTest < ActionController::TestCase
  test "Deleting user" do
     user = User.new(username:'test', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123',password_confirmation:'123',admin_type:'0')
     user.destroy
     assert user.valid?
  end
  
   
   test "Editing user" do
    user1 = User.new(username:'test', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123',password_confirmation:'123',admin_type:'0')
    user2 = User.new(username:'check', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123',password_confirmation:'123',admin_type:'0')
    user1.username= 'check'
    assert user1.save
  end

end
