import { isAuthenticatedResolver } from "modules/auth"
import { NotStatusOwnerError, StatusNotFoundError } from "./errors"

export const statusExistedResolver = isAuthenticatedResolver.createResolver(
  async (root, { statusId }, { models: { Status } }) => {
    const status = await Status.findById(statusId)
    if (!status) {
      throw new StatusNotFoundError()
    }
  },
)

export const isStatusOwnerResolver = statusExistedResolver.createResolver(
  async (root, { statusId }, { userId, models: { Status } }) => {
    const status = await Status.findById(statusId)

    if (status.ownerId.toString() !== userId) {
      throw new NotStatusOwnerError()
    }
  },
)
