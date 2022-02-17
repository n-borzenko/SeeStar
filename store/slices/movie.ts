import type { RootState } from "store";
import type { MovieExtended } from "types/movie";
import { createAsyncThunk, createAction, createReducer } from "@reduxjs/toolkit";
import { getMovie } from "requests/movie";

const storeNamespace = "movie";

type MovieState = {
  data?: MovieExtended;
  requestStatus: "idle" | "pending" | "succeeded" | "failed";
  requestId?: string;
  errorMessage?: string;
};

const initialState: MovieState = {
  data: undefined,
  requestStatus: "idle",
  requestId: undefined,
  errorMessage: undefined,
};

export const fetchMovie = createAsyncThunk<
  MovieExtended,
  number | undefined,
  {
    rejectValue: string;
    state: RootState;
  }
>(`${storeNamespace}/fetch_data`, async (id, { rejectWithValue, signal }) => {
  try {
    if (!id || id < 1) {
      return rejectWithValue(`[Store layer: fetch movie ${id}] Incorrect id provided`);
    }
    const result = await getMovie(id, signal);
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue(`[Store layer: fetch movie ${id}] Data fetching error`);
  }
});

export const clearMovie = createAction(`${storeNamespace}/clear_data`);

const MovieReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMovie.pending, (state, { meta }) => {
    state.data = undefined;
    state.errorMessage = undefined;
    state.requestStatus = "pending";
    state.requestId = meta.requestId;
  });
  builder.addCase(fetchMovie.fulfilled, (state, { payload, meta }) => {
    if (state.requestId === meta.requestId) {
      state.requestStatus = "succeeded";
      state.requestId = undefined;
      state.data = payload;
    }
  });
  builder.addCase(fetchMovie.rejected, (state, { payload, meta }) => {
    if (state.requestId === meta.requestId) {
      state.errorMessage = payload;
      state.requestStatus = "failed";
      state.requestId = undefined;
    }
  });
  builder.addCase(clearMovie, () => {
    return initialState;
  });
});

export default MovieReducer;
