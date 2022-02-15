import type { RootState } from "store";
import type { DataFetcherResult } from "store/helpers";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import isDefined from "helpers/isDefined";
import { getConfiguration } from "requests/configuration";

const storeNamespace = "configuration";

type ImageSize = {
  id: string;
  width: number;
  height: number;
  key?: string;
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

const configurationReducer = createReducer(initialState, (builder) => {
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

        const keys = ["small", "medium", "large"];
        const widthRegexp = /^w([1-9]+)$/;

        state.data.posterSizes = payload.images.posterSizes
          .map((sizeId, index) => {
            const matched = sizeId.match(widthRegexp);
            if (!matched) {
              return undefined;
            }
            const width = parseInt(matched[1], 10);
            return {
              id: sizeId,
              width: width,
              height: Math.ceil(width * 1.5),
              key: index < keys.length ? keys[index] : undefined,
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

export default configurationReducer;
