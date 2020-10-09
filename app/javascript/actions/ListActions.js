import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}
export function createListSuccess(newList) {
  return { type: types.CREATE_LIST_SUCCESS, newList };
}

export function updateListRequest() {
  return { type: types.UPDATE_LIST_REQUEST };
}
export function updateListSuccess(id, updatedList) {
  return { type: types.UPDATE_LIST_SUCCESS, updatedList, id };
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


export function updateList(id, list, callback) {
  return function(dispatch) {
    dispatch(updateListRequest());
    apiClient.updateList(id, list, (updatedList) => {
      dispatch(updateListSuccess(id, updatedList));

      if (callback) {
        callback(updatedList);
      }
    });
  };
}
