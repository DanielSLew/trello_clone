import { combineReducers } from "redux";
import boards from "./boards";
import lists from "./lists";
import cards from "./cards";
import card from "./card";

const rootReducer = combineReducers({ boards, lists, cards, card });

export default rootReducer;
