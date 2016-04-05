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
    assert !user2.save
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
  
  test "Incorrect email" do
    user=User.new
    user.username="hello"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    assert !user.save
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
  
  test "Correct information passed" do
    user=User.new
    user.username="hello"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    assert user.save
    assert user.valid?
  end
  
  test "Not enough number of password" do
    user = User.new(username: '123')
    user.password="1"
    assert !user.save
  end
  
  test "Too many number of password" do
    user=User.new
    user.username="hello"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="012345678901234567890123456789"
    user.password_confirmation="012345678901234567890123456789"
    user.admin_type=0
    assert !user.save
  end
  
   test "Too many characters on username" do
    user=User.new
    user.username="abcdefghijklmnopqrstuvwxyz"
    user.firstname="hello"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    assert !user.save
  end
  
  test "Too many characters on firstname" do
    user=User.new
    user.username="hello"
    user.firstname="abcdefghijklmnopqrstuvwxyz"
    user.lastname="world"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    assert !user.save
  end
  
  test "Too many characters on lastname" do
    user=User.new
    user.username="hello"
    user.firstname="hello"
    user.lastname="abcdefghijklmnopqrstuvwxyz"
    user.email="helloworld@sfu.ca"
    user.password="123456"
    user.password_confirmation="123456"
    user.admin_type=0
    assert !user.save
  end
end
