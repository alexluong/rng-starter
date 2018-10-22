import baseResolver from "config/baseResolver"
import { UnauthenticatedError, AlreadyAuthenticatedError } from "./errors"

export { baseResolver }

export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { userId }) => {
    if (!userId) throw new UnauthenticatedError()
  },
)

export const isAuthenticatedWithUserResolver = isAuthenticatedResolver.createResolver(
  async (root, args, context) => {
    const {
      userId,
      models: { User },
    } = context

    const user = await User.findById(userId)
    context.user = user
  },
)

export const isNotAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { userId }) => {
    if (userId) throw new AlreadyAuthenticatedError()
  },
)
