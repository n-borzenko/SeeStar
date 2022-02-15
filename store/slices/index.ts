import { combineReducers } from "redux";

import configurationReducer from "./configuration";
import genresReducer from "./genres";
import searchReducer from "./search";

const rootReducer = combineReducers({
  configuration: configurationReducer,
  genres: genresReducer,
  search: searchReducer,
});

export default rootReducer;
