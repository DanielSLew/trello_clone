import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListSuccess() {
  return { type: types.CREATE_LIST_SUCCESS };
}
