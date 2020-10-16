export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      const filteredLists = state.filter((list) => {
        return list.board_id !== action.board.id;
      });

      const listsWithoutCards = action.board.lists.map((list) => {
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });

      return filteredLists.concat(listsWithoutCards);
    case "CREATE_LIST_SUCCESS":
      return state.concat(action.newList);
    case "UPDATE_LIST_SUCCESS":
      return state.map((list) => {
        if (action.id === list.id) {
          return Object.assign({}, list, action.list);
        } else {
          return list;
        }
      });
    default:
      return state;
  }
}
