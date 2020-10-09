export default function card(state = null, action) {
  switch (action.type) {
    case "FETCH_CARD_SUCCESS":
      return action.card
    default:
      return state;
  }
}