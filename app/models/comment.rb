class Comment < ApplicationRecord
  validates_presence_of :text, allow_blank: false
  belongs_to :card

  # def board_id
  #   list.board_id
  # end

  # def attributes
  #   super.merge({board_id: board_id})
  # end
end
    