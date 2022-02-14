import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { getConfiguration } from "requests/configuration";
import type { RootState } from "store";
import isDefined from "helpers/isDefined";
import type { DataFetcherResult } from "helpers/storeHelpers";

const storeNamespace = "configuration";

type ImageSize = {
  id: string;
  width: number;
  height: number;
};

type ConfigurationState = {
  data: {
    baseUrl: string;
    secureBaseUrl: string;
    posterSizes: ImageSize[];
  };
  requestStatus: "idle" | "pending" | "succeeded" | "failed";
  requestId?: string;
  errorMessage?: string;
};

const initialState: ConfigurationState = {
  data: {
    baseUrl: "",
    secureBaseUrl: "",
    posterSizes: [],
  },
  requestStatus: "idle",
  requestId: undefined,
  errorMessage: undefined,
};

export const fetchConfiguration = createAsyncThunk<
  DataFetcherResult<typeof getConfiguration>,
  undefined,
  {
    rejectValue: string;
    state: RootState;
  }
>(`${storeNamespace}/fetch_data`, async (_, { rejectWithValue, signal }) => {
  try {
    const result = await getConfiguration(signal);
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue("[Store layer: fetch configuration] Data fetching error");
  }
});

const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchConfiguration.pending, (state, { meta }) => {
    state.data = initialState.data;
    state.errorMessage = undefined;
    state.requestStatus = "pending";
    state.requestId = meta.requestId;
  });
  builder.addCase(fetchConfiguration.fulfilled, (state, { payload, meta }) => {
    if (state.requestId === meta.requestId) {
      state.requestStatus = "succeeded";
      state.requestId = undefined;

      if (payload) {
        state.data.baseUrl = payload.images.baseUrl;
        state.data.secureBaseUrl = payload.images.secureBaseUrl;

        const widthRegexp = /^w([1-9]+)$/;
        state.data.posterSizes = payload.images.posterSizes
          .map((sizeId) => {
            const matched = sizeId.match(widthRegexp);
            if (!matched) {
              return undefined;
            }
            const width = parseInt(matched[1], 10);
            return {
              id: sizeId,
              width: width,
              height: width * 1.5,
            };
          })
          .filter(isDefined);
      }
    }
  });
  builder.addCase(fetchConfiguration.rejected, (state, { payload, meta }) => {
    if (state.requestId === meta.requestId) {
      state.errorMessage = payload;
      state.requestStatus = "failed";
      state.requestId = undefined;
    }
  });
});

export default searchReducer;
