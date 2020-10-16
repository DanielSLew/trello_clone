json.board_id @board_id
json.merge! @card.attributes

json.comments_count @card.comments.size

json.actions(@card.actions) do |action|
  json.merge! action.attributes
end
