import { and } from "apollo-resolvers"
import {
  baseResolver,
  isAuthenticatedResolver,
  UnauthorizedError,
} from "modules/auth"
import { StatusNotFoundError } from "./errors"

export const statusExistedResolver = baseResolver.createResolver(
  async (root, { statusId }, context) => {
    const status = await context.models.Status.findById(statusId)
    if (!status) {
      throw new StatusNotFoundError()
    }
    context.status = status
  },
)

export const isStatusOwnerResolver = and(
  isAuthenticatedResolver,
  statusExistedResolver,
)((root, args, { userId, status }) => {
  if (status.ownerId.toString() !== userId) {
    throw new UnauthorizedError()
  }
})
