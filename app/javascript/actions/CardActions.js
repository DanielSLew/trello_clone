import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function fetchCard(cardId) {
  return function(dispatch) {
    dispatch(fetchCardRequest());
    apiClient.getCard(cardId, card => dispatch(fetchCardSuccess(card)));
  };
}