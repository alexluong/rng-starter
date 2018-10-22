import { createError } from "apollo-errors"

export const CommentNotFoundError = createError("UnauthenticatedError", {
  message: "Cannot find comment.",
})
