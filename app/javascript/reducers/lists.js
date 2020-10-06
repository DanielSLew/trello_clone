export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      return action.board.lists.map((list) => {
        const {cards, ...listWithoutCards} = list;
        return listWithoutCards;
        // return {
        //   listWithoutCards
        //   // id: list.id,
        //   // title: list.title,
        //   // board_id: list.board_id,
        // };
      });
    default:
      return state;
  }
}
