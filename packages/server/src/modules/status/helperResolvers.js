import { and } from "apollo-resolvers"
import {
  baseResolver,
  isAuthenticatedResolver,
  UnauthorizedError,
} from "modules/auth"
import { NotStatusOwnerError, StatusNotFoundError } from "./errors"

export const statusExistedResolver = baseResolver.createResolver(
  async (root, { statusId }, { models: { Status } }) => {
    const status = await Status.findById(statusId)
    if (!status) {
      throw new StatusNotFoundError()
    }
  },
)

export const isStatusOwnerResolver = and(
  isAuthenticatedResolver,
  statusExistedResolver,
)(async (root, { statusId }, { userId, models: { Status } }) => {
  const status = await Status.findById(statusId)

  if (status.ownerId.toString() !== userId) {
    throw new UnauthorizedError()
  }
})
