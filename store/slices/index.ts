import { combineReducers } from "redux";
import searchReducer from "./search";
import configurationReducer from "./configuration";
import genresReducer from "./genres";

const rootReducer = combineReducers({
  search: searchReducer,
  configuration: configurationReducer,
  genres: genresReducer,
});

export default rootReducer;
