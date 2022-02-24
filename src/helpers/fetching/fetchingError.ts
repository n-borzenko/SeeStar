class FetchingError extends Error {
  status?: number;

  constructor(status?: number, ...params: any) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchingError);
    }

    this.name = "FetchingError";
    this.status = status;
  }
}

export default FetchingError;
