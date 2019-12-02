json.array! @messafes do |message|
  json.id message.id
  json.text message.text
  json.image message.image
  json.user_id message.user_id
  json.nickname message.user.nickname
  json.user_sign_in current_user
end