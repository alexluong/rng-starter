import { createError } from "apollo-errors"

export const UnauthenticatedError = createError("UnauthenticatedError", {
  message: "Authentication required.",
})

export const AlreadyAuthenticatedError = createError(
  "AlreadyAuthenticatedError",
  {
    message: "Already authenticated.",
  },
)

export const AuthenticationFailedError = createError(
  "AuthenticationFailedError",
  {
    message: "Incorrect email and password.",
  },
)

// export const ForbiddenError = createError("ForbiddenError", {
//   message: "Not allowed.",
// })

export const UserAlreadyExistedError = createError("UserAlreadyExistedError", {
  message: "User already existed.",
})
