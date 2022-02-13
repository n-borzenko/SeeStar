import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { getSearchResults, GetSearchResultsParameters } from "requests/search";
import type { RootState } from "store";
import { MediaTypes } from "types/search";
import type { SearchItem } from "types/search";
import { prepareArgForAsyncThunk } from "./helpers";
import type { DataFetcherResult } from "./helpers";

type SearchState = {
  data: {
    itemsById: { [key: number]: SearchItem };
    pages: { [key: number]: number[] };
    totalResults: number;
    totalPages: number;
  };
  parameters: GetSearchResultsParameters;
  requestStatus: "idle" | "pending" | "succeeded" | "failed";
  requestId?: string;
  errorMessage?: string;
};

const initialParams: GetSearchResultsParameters = {
  text: "",
  type: MediaTypes.Any,
  page: 1,
};

const initialState: SearchState = {
  data: {
    itemsById: {},
    pages: {},
    totalResults: 0,
    totalPages: 0,
  },
  parameters: initialParams,
  requestStatus: "idle",
  requestId: undefined,
  errorMessage: undefined,
};

const fetchSearchResultsUnwrapped = createAsyncThunk<
  DataFetcherResult<typeof getSearchResults> | undefined,
  GetSearchResultsParameters,
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "search/fetch_results",
  async (params, { rejectWithValue, signal }) => {
    try {
      if (params.text.length === 0) {
        // there is no need to make request with empty query string
        return {
          page: 1,
          results: [],
          totalResults: 0,
          totalPages: 0,
        };
      }
      const result = await getSearchResults(params, signal);
      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue("[Store layer: fetch search results] Data fetching error");
    }
  },
  {
    condition: (params, { getState }) => {
      const state = getState().search;
      if (
        state.requestStatus === "succeeded" &&
        params.text === state.parameters.text &&
        params.type === state.parameters.type &&
        state.data.pages[params.page]?.length
      ) {
        // requested page has already been downloaded
        return false;
      }
    },
  }
);

export const fetchSearchResults = prepareArgForAsyncThunk(
  fetchSearchResultsUnwrapped,
  ({ text, type, page }: Partial<GetSearchResultsParameters>) => {
    return {
      text: text ?? initialParams.text,
      type: type ?? initialParams.type,
      page: page ?? initialParams.page,
    };
  }
);

export const clearSearchResults = createAction("search/clear_results");

const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchSearchResultsUnwrapped.pending, (state, { meta }) => {
    if (state.parameters.text !== meta.arg.text || state.parameters.type !== meta.arg.type) {
      state.data = initialState.data;
    }
    state.parameters = meta.arg;
    state.errorMessage = undefined;
    state.requestStatus = "pending";
    state.requestId = meta.requestId;
  });
  builder.addCase(fetchSearchResultsUnwrapped.fulfilled, (state, { payload, meta }) => {
    if (state.requestId === meta.requestId) {
      state.requestStatus = "succeeded";
      state.requestId = undefined;
      if (payload) {
        payload.results.forEach((item) => (state.data.itemsById[item.id] = item));
        state.data.pages[payload.page] = payload.results.map(({ id }) => id);
        state.data.totalResults = payload.totalResults;
        state.data.totalPages = payload.totalPages;
      }
    }
  });
  builder.addCase(fetchSearchResultsUnwrapped.rejected, (state, { payload, meta }) => {
    if (state.requestId === meta.requestId) {
      state.errorMessage = payload;
      state.requestStatus = "failed";
      state.requestId = undefined;
    }
  });
  builder.addCase(clearSearchResults, () => {
    return initialState;
  });
});

export default searchReducer;
