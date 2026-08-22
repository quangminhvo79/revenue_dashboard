class CreateOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false
      t.float      :total_cost
      t.string     :area, default: :pos
      t.datetime   :date
      t.string     :status, default: :pending
      t.integer    :covers, default: 1

      t.timestamps
    end
  end
end
