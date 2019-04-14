# json.(@message, :content ,:image)
json.content  @message.content
json.image   @message.image.url   #検証でimageだけurlがついてること確認
json.user_id  @message.user.id
json.group_id @message.group_id
json.user_name  @message.user.name
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
