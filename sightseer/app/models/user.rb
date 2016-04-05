class User < ActiveRecord::Base
    has_secure_password
    validates :firstname, presence: true, length: { maximum: 20 }
    validates :lastname, presence: true, length: { maximum: 20 }
    validates :username, presence: true, uniqueness: true, length: { maximum: 20 }
    validates :email, email_format: { message: "Wrong! Please input real email!" }
    validates_length_of :password, :in => 6..20, :on => :create
    validates :password_confirmation, presence: true
end
