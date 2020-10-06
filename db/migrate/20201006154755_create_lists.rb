class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.string :title, nil: false
      t.references :board, foreign_key: true
      t.timestamps
    end
  end
end
