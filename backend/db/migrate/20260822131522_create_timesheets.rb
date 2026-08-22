class CreateTimesheets < ActiveRecord::Migration[8.0]
  def change
    create_table :shifts do |t|
      t.string   :name, null: false
      t.integer  :wage, null: false, default: 1
    end

    create_table :timesheets do |t|
      t.references :user, index: true
      t.references :shift
      t.datetime   :work_date, null: false
      t.integer    :wage_at_time

      t.timestamps
    end
  end
end
