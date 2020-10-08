import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}
export function createListSuccess(newList) {
  return { type: types.CREATE_LIST_SUCCESS, newList };
}

export function createList(list, callback) {
  return function(dispatch) {
    dispatch(createListRequest());
    apiClient.createList(list, (newList) => {
      dispatch(createListSuccess(newList));

      if (callback) {
        callback(newList);
      }
    });
  };
}
