import { createError } from "apollo-errors"

export const StatusNotFoundError = createError("UnauthenticatedError", {
  message: "Cannot find status.",
})

export const NotStatusOwnerError = createError("UnauthenticatedError", {
  message: "Not authorized to delete status.",
})

export const NoUpdateDataError = createError("NoUpdateDataError", {
  message: "No data is given.",
})
