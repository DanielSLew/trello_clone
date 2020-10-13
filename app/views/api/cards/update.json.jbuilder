json.board_id @board_id
json.merge! @card.attributes

json.comments_count @card.comments.size
