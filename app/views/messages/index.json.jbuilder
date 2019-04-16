
json.array! @new_message do |message|
  json.id  message.id
  json.content  message.content
  json.image   message.image.url   #検証でimageだけurlがついてること確認
  json.user_name  message.user.name
  json.created_at  message.created_at.strftime("%Y/%m/%d %H:%M")
end

# 新しいメッセージが生成された時
