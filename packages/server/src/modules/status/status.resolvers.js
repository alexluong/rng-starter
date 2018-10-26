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
        return Comment.find({ statusId: id }).sort("-createdAt")
      },
    ),
  },
  Query: {
    /**
     * Get a status from statusId
     */
    getStatusById: isAuthenticatedResolver.createResolver(
      (root, { statusId }, { models: { Status } }) => {
        return Status.findById(statusId)
      },
    ),
    /**
     * Get all statuses from everyone
     * Permission: admin only
     * TODO: Work on permission
     */
    statuses: isAuthenticatedResolver.createResolver(
      (root, args, { models: { Status } }) => {
        return Status.find().sort("-createdAt")
      },
    ),
  },
  Mutation: {
    /**
     * Create status
     */
    createStatus: isAuthenticatedResolver.createResolver(
      (root, { content, imageUrl }, { userId, models: { Status } }) => {
        const status = new Status({ content, imageUrl, ownerId: userId })
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
      (root, { content, imageUrl }, { status }) => {
        if (!content && !imageUrl) {
          throw new NoUpdateDataError()
        }

        if (content) status.content = content
        if (imageUrl) status.imageUrl = imageUrl

        return status.save()
      },
    ),
  },
}

export default resolvers
