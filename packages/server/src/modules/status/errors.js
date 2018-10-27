import { createError } from "apollo-errors"

export const StatusNotFoundError = createError("StatusNotFoundError", {
  message: "Cannot find status.",
})

export const CommentNotFoundError = createError("CommentNotFoundError", {
  message: "Cannot find comment.",
})

export const NoUpdateDataError = createError("NoUpdateDataError", {
  message: "No data is given.",
})
