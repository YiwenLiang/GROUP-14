require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "Missing first name" do
    user = User.new
    assert !user.save
    assert !user.errors[:firstname].empty?
  end
  
  test "Missing username" do
    user = User.new
    assert !user.save
    assert !user.errors[:username].empty?
  end
  
   test "Username unique" do
    user1 = User.new(username: '123')
    assert !user1.valid?
    user2=User.new(username:'123')
    assert !user2.valid?
    assert_not_nil user2.errors[:username]
  end
  
  test "Missing last name" do
    user = User.new
    assert !user.save
    assert !user.errors[:lastname].empty?
  end
  
  test "Missing email" do
    user = User.new
    assert !user.save
    assert !user.errors[:email].empty?
  end
  
  test "Missing password" do
    user = User.new
    assert !user.save
    assert !user.errors[:password].empty?
  end
  
  test "Missing password confirmation" do
    user = User.new
    assert !user.save
    assert !user.errors[:password_confirmation].empty?
  end
    
end
