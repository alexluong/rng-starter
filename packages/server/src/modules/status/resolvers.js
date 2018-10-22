import { baseResolver, isAuthenticatedResolver } from "modules/auth"
import { isStatusOwnerResolver } from "./helperResolvers"
import { NoUpdateDataError } from "./errors"

const resolvers = {
  Status: {
    owner: baseResolver.createResolver(
      ({ ownerId }, args, { models: { User } }) => {
        return User.findById(ownerId)
      },
    ),
    comments: baseResolver.createResolver(
      ({ id }, args, { models: { Comment } }) => {
        return Comment.find({ statusId: id })
      },
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
    deleteStatus: isStatusOwnerResolver.createResolver(
      (root, args, { status }) => {
        return status.remove()
      },
    ),
    /**
     * Update status
     * TODO: Add validation resolvers
     */
    updateStatus: isStatusOwnerResolver.createResolver(
      (root, { content, imageURL }, { status }) => {
        if (!content && !imageURL) {
          throw new NoUpdateDataError()
        }

        if (content) status.content = content
        if (imageURL) status.imageURL = imageURL

        return status.save()
      },
    ),
  },
}

export default resolvers
