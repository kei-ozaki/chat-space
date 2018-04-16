json.name   @message.user.name
json.date   @message.created_at.strftime("%y/%m/%d/%H:%M:%S")
json.text   @message.text
json.image  @message.image.url
