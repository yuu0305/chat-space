class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false, unique: true
      t.timestamps
    end
  end
end
# ## groupテーブル

# |Column|Type|Options|
# |------|----|-------|
# |name|string|null: false|
# |user_id|references|null:false,foreign_key:true|


# ### Association
# - has_many :messages
# - has_many :members
# - has/many :users,through: :members

