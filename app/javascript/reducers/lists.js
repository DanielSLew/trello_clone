export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      return action.board.lists.map((list) => {
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });
    case "CREATE_LIST_SUCCESS":
      return state.concat(action.newList);
    default:
      return state;
  }
}
