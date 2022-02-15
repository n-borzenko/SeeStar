import type { RootState } from "store";
import type { DataFetcherResult } from "store/helpers";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { getGenres } from "requests/genres";
import { MediaTypes } from "types/search";

const storeNamespace = "genres";

type GenreState = {
  data: { [key: number]: string };
  requestStatus: "idle" | "pending" | "succeeded" | "failed";
  requestId?: string;
  errorMessage?: string;
};

type GenresState = {
  [key in MediaTypes.Movie | MediaTypes.Show]: GenreState;
};

const initialState: GenresState = {
  [MediaTypes.Movie]: {
    data: {},
    requestStatus: "idle",
    requestId: undefined,
    errorMessage: undefined,
  },
  [MediaTypes.Show]: {
    data: {},
    requestStatus: "idle",
    requestId: undefined,
    errorMessage: undefined,
  },
};

export const fetchGenres = createAsyncThunk<
  DataFetcherResult<typeof getGenres>,
  MediaTypes.Movie | MediaTypes.Show,
  {
    rejectValue: string;
    state: RootState;
  }
>(`${storeNamespace}/fetch_data`, async (type, { rejectWithValue, signal }) => {
  try {
    const result = await getGenres(type, signal);
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue("[Store layer: fetch genres] Data fetching error");
  }
});

const genresReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchGenres.pending, (state, { meta }) => {
    state[meta.arg].data = initialState[meta.arg].data;
    state[meta.arg].errorMessage = undefined;
    state[meta.arg].requestStatus = "pending";
    state[meta.arg].requestId = meta.requestId;
  });
  builder.addCase(fetchGenres.fulfilled, (state, { payload, meta }) => {
    if (state[meta.arg].requestId === meta.requestId) {
      state[meta.arg].requestStatus = "succeeded";
      state[meta.arg].requestId = undefined;
      if (payload?.genres) {
        state[meta.arg].data = payload.genres.reduce((result, { id, name }) => ({
          ...result,
          [id]: name,
        }));
      }
    }
  });
  builder.addCase(fetchGenres.rejected, (state, { payload, meta }) => {
    if (state[meta.arg].requestId === meta.requestId) {
      state[meta.arg].errorMessage = payload;
      state[meta.arg].requestStatus = "failed";
      state[meta.arg].requestId = undefined;
    }
  });
});

export default genresReducer;
