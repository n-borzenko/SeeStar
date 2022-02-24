type LoadingRequestResult = {
  state: "loading";
};

type FailedRequestResult = {
  state: "failed";
  errorMessage: string;
  isRetryAvailable: boolean;
};

type SuccessfulRequestResult<T> = {
  state: "succeeded";
  data: T;
};

export const createLoadingRequestResult = (): LoadingRequestResult => ({
  state: "loading",
});

export const createFailedRequestResult = (
  message: string,
  isRetryAvailable = false
): FailedRequestResult => ({
  state: "failed",
  errorMessage: message,
  isRetryAvailable,
});

export const createSuccessfulRequestResult = <T>(data: T): SuccessfulRequestResult<T> => ({
  state: "succeeded",
  data,
});
