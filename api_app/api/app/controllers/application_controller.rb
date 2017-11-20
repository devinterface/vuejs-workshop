class ApplicationController < ActionController::API
  include Knock::Authenticable

  protected

  def unsafe_params
    params.to_unsafe_h
  end

  private
  
  def authenticate_v1_user
    authenticate_for V1::User
  end
end
