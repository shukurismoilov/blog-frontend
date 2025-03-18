import { ApiError } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiErrorParser = (error: any): ApiError => {
  let errorReason = "";
  let errorMessage;
  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorReason = "bad_request";
        break;
      case 401:
        errorReason = "unauthorized";
        break;
      case 403:
        errorReason = "forbidden";
        break;
      case 404:
        errorReason = "not_found";
        break;
      case 500:
        errorReason = "server_error";
        errorMessage = "Error. The application server is unavailable.";
        break;
      default:
        errorReason = "unknown";
        break;
    }
    if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.response.data) {
      errorMessage = error.response.data;
    }
  } else if (error.request) {
    errorReason = "connection_lost";
    errorMessage = "Lost connection to server";
  } else {
    errorReason = "unknown";
    errorMessage = "Unknown error.";
  }

  return { reason: errorReason, message: errorMessage };
};

export { apiErrorParser };
