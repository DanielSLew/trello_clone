export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      return action.board.lists.flatMap((list) => {
        return list.cards;
      });
    case "FETCH_CARD_SUCCESS":
      return state.concat(action.card);
    case "CREATE_CARD_SUCCESS":
      return state.concat(action.card);
    default:
      return state;
  }
}
