class User < ActiveRecord::Base
    has_secure_password
    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true
    validates :password_confirmation, presence: true


  
end
