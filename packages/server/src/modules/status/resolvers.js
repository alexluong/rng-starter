import { baseResolver, isAuthenticatedResolver } from "modules/auth"
import { isStatusOwnerResolver } from "./helperResolvers"
import { NotStatusOwnerError, NoUpdateDataError } from "./errors"

const resolvers = {
  Status: {
    owner: baseResolver.createResolver(
      ({ ownerId }, args, { models: { User } }) => {
        return User.findById(ownerId)
      },
    ),
    comments: baseResolver.createResolver(
      ({ _id }, args, { models: { Comment } }) => {
        return Comment.find({ statusId: _id })
      },
    ),
    createdAt: baseResolver.createResolver(({ createdAt }) =>
      JSON.stringify(createdAt),
    ),
    updatedAt: baseResolver.createResolver(({ updatedAt }) =>
      JSON.stringify(updatedAt),
    ),
  },
  Query: {
    /**
     * Get a status from statusId
     */
    status: isAuthenticatedResolver.createResolver(
      (root, { statusId }, { models: { Status } }) => {
        return Status.findById(statusId)
      },
    ),
    /**
     * Get all statuses from a user
     */
    statuses: isAuthenticatedResolver.createResolver(
      (root, args, { userId, models: { Status } }) => {
        return Status.find({ ownerId: userId })
      },
    ),
  },
  Mutation: {
    /**
     * Create status
     */
    createStatus: isAuthenticatedResolver.createResolver(
      (root, { content, imageURL }, { userId, models: { Status } }) => {
        const status = new Status({ content, imageURL, ownerId: userId })
        return status.save()
      },
    ),
    /**
     * Delete status
     */
    deleteStatus: isAuthenticatedResolver.createResolver(
      async (root, { statusId }, { userId, models: { Status } }) => {
        const status = await Status.findById(statusId)

        if (status.ownerId.toString() !== userId) {
          throw new NotStatusOwnerError()
        }

        return status.remove()
      },
    ),
    /**
     * Update status
     * TODO: Hopefully there's a way to pass status down
     */
    updateStatus: isStatusOwnerResolver.createResolver(
      (root, { statusId, content, imageURL }, { models: { Status } }) => {
        const update = { content, imageURL }
        if (!content) delete update.content
        if (!imageURL) delete update.imageURL

        if (Object.keys(update).length === 0) {
          throw new NoUpdateDataError()
        }

        return Status.findByIdAndUpdate(
          statusId,
          { content, imageURL },
          { new: true },
        )
      },
    ),
  },
}

export default resolvers
