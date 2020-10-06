export default function board(state = {}, action) { // state is object with 
    switch (action.type) {
      case "FETCH_BOARD_SUCCESS":
        return action.board;
      default:
        return state;
    }
  }
  