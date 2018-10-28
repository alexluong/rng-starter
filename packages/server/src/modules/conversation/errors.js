import { createError } from "apollo-errors"

export const SomeUserNotFoundError = createError("SomeUserNotFoundError", {
  message: "Cannot find some users.",
})

export const ConversationNotFoundError = createError(
  "ConversationNotFoundError",
  {
    message: "Cannot find conversation.",
  },
)

export const MessageNotFoundError = createError("MessageNotFoundError", {
  message: "Cannot find message.",
})
