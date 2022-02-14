import { combineReducers } from "redux";
import searchReducer from "./search";
import configurationReducer from "./configuration";

const rootReducer = combineReducers({
  search: searchReducer,
  configuration: configurationReducer,
});

export default rootReducer;
