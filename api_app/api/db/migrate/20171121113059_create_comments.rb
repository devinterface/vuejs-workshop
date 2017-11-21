class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.index :user_id

      t.integer :post_id, null: false
      t.index :post_id

      t.string :body
      t.timestamps
    end
  end
end
