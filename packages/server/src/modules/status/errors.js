import { createError } from "apollo-errors"

export const StatusNotFoundError = createError("UnauthenticatedError", {
  message: "Cannot find status.",
})

export const NoUpdateDataError = createError("NoUpdateDataError", {
  message: "No data is given.",
})
