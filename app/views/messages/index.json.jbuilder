json.messages @new_messages.each do |message|
  json.name   message.user.name
  json.date   message.created_at.to_s(:default)
  json.text   message.text
  json.image  message.image.url
  json.id     message.id
end
