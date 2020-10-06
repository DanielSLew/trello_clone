import { combineReducers } from "redux";
import boards from "./boards";
import board from "./board";

const rootReducer = combineReducers({ boards, board });

export default rootReducer;
