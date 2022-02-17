import { combineReducers } from "redux";
import configurationReducer from "./configuration";
import genresReducer from "./genres";
import movieReducer from "./movie";
import searchReducer from "./search";

const rootReducer = combineReducers({
  configuration: configurationReducer,
  genres: genresReducer,
  movie: movieReducer,
  search: searchReducer,
});

export default rootReducer;
