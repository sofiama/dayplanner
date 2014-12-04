Rails.application.config.middleware.use OmniAuth::Builder do

  provider :google_oauth2, ENV["GOOGLE_ID"], ENV["GOOGLE_SECRET"],
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar']


  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']
end