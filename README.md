
##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|e-mail|string|null: false|


### Association
- has_many :messages
- has_many :members
- has_many :groups,through: :members


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null:false,foreign_key:true|
|group_id|references|null:false,foreign_key:true|



### Association
- has_many :messages
- has_many :members




## membersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|references|null:false,foreign_key:true|
|user_id|references|null:false,foreign_key:true|

### Association
- belongs_to :group
- belongs_to :user




## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null:false|
|image|string|
|group_id|references|null:false,foreign_key:true|
|user_id|references|null:false,foreign_key:true|

### Association
- belongs_to :group
- belongs_to :user
