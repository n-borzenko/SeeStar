import { combineReducers } from "redux";
import searchReducer from "./fields/search";

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
