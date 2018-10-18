import baseResolver from "config/baseResolver"
import { UnauthenticatedError, AlreadyAuthenticatedError } from "./errors"

export { baseResolver }

export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { userId }) => {
    if (!userId) throw new UnauthenticatedError()
  },
)

export const isNotAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { userId }) => {
    if (userId) throw new AlreadyAuthenticatedError()
  },
)
