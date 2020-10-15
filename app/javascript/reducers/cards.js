export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      return action.board.lists.flatMap((list) => {
        return list.cards;
      });
    case "FETCH_CARD_SUCCESS":
      const cards = state.map((card) => {
        if (card.id === action.card.id) {
          const { comments, ...cardWithoutComments } = action.card;
          return cardWithoutComments;
        } else {
          return card;
        }
      });

      return cards.length === 0 ? [action.card] : cards;
    case "CREATE_CARD_SUCCESS":
      return state.concat(action.card);
    case "UPDATE_CARD_SUCCESS":
      return state.map((card) => {
        if (card.id === action.id) {
          return Object.assign({}, card, action.card);
        } else {
          return card;
        }
      });
    case "DELETE_CARD_SUCCESS":
      return state.filter((card) => {
        return card.id !== action.id;
      });
    default:
      return state;
  }
}
