import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card };
}

export function fetchCard(cardId) {
  return function(dispatch) {
    dispatch(fetchCardRequest());
    apiClient.getCard(cardId, (card) => dispatch(fetchCardSuccess(card)));
  };
}

// export function createCard(newCard) {
//   return function(dispatch) {
//     dispatch(createCardRequest());
//     apiClient.getCard(card => dispatch(createCardSuccess(newCard)));
//   };
// }

export function createCard(newCard, callback) {
  return function(dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(newCard, (card) => {
      dispatch(createCardSuccess(card));

      if (callback) {
        callback(card);
      }
    });
  };
}
