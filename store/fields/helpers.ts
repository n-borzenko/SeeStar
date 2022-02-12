import type { AsyncThunk } from "@reduxjs/toolkit";

export const prepareArgForAsyncThunk = <Returned, ThunkArg, ThunkApiConfig, UnprocessedArg>(
  thunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>,
  preprocessor: (arg: UnprocessedArg) => ThunkArg
) => {
  return (arg: UnprocessedArg) => thunk(preprocessor(arg));
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type DataFetcherResult<T extends (...args: any) => any> = UnwrapPromise<ReturnType<T>>;
