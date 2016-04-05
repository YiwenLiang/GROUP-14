require 'test_helper'

class AdminControllerTest < ActionController::TestCase
  test "Deleting user" do
     user = User.new(username:'test', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123456',password_confirmation:'123456',admin_type:'0')
     user.destroy
     assert_response 200
     assert user.valid?
  end
  
   
   test "Editing user correctly" do
    user1 = User.new(username:'test', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123456',password_confirmation:'123456',admin_type:'0')
    user2 = User.new(username:'check', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123456',password_confirmation:'123456',admin_type:'0')
    user1.username= 'check'
    assert user1.save
    assert user1.valid?
  end

   test "Editing user missing information" do
    user1 = User.new(username:'test', firstname:'case', lastname:'1', email:'test@sfu.ca', password:'123456',password_confirmation:'123456',admin_type:'0')
    assert user1.save
    assert user1.valid?
    user2 = User.new(username:'check', firstname:'', lastname:'', email:'', admin_type:'0')
    assert !user2.save
   end
end
