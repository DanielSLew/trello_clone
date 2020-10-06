json.merge! @board.attributes

json.lists(@board.lists) do |list|
  json.merge! list.attributes

  json.cards(list.cards) do |card|
    json.id card.id
    json.title card.title
    json.description card.description
    json.due_date card.due_date
    json.labels card.labels
  end
end