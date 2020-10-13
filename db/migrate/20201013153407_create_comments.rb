class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :text, nil: false
      t.references :card, foreign_key: true
      t.timestamps
    end
  end
end
