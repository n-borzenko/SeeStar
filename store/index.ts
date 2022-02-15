import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./slices";

const devMiddleware = process.env.NODE_ENV === `development` ? [logger] : [];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(devMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
