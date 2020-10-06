export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      return action.board.lists.flatMap((list) => {
        return list.cards;
      });
    default:
      return state;
  }
}
