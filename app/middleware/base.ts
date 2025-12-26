import { os } from "@orpc/server";

export const base = os.$context<{ request: Request }>().errors({
  RATE_LIMITED: {
    message: "You have been rate limited. Please try again later.",
  },
  BAD_REQUEST: {
    message: "The request was malformed or invalid.",
  },
  NOT_FOUND: {
    message: "The requested resource was not found.",
  },
  FORBIDDEN: {
    message: "You do not have permission to access this resource.",
  },
  UNAUTHORIZED: {
    message: "You are not authorized to access this resource.",
  },
  INTERNAL_SERVER_ERROR: {
    message: "An internal server error occurred.",
  },
});
