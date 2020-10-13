json.board_id @board_id
json.merge! @card.attributes

json.comments_count @card.comments.size
json.comments(@card.comments) do |comment|
  json.merge! comment.attributes
end
