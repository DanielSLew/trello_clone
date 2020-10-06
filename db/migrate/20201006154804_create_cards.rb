class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :title, nil: false
      t.text :description
      t.datetime :due_date
      t.string :labels, array: true, default: [], nil: false
      t.references :list, foreign_key: true
      t.timestamps
    end
  end
end
