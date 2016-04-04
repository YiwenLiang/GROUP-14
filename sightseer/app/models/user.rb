class User < ActiveRecord::Base
    has_secure_password
    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :username, presence: true, uniqueness: true
    validates :email, email_format: { message: "Wrong! Please input real email!" }
    validates_length_of :password, :in => 6..20, :on => :create
    validates :password_confirmation, presence: true
end
