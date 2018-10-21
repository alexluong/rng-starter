import { and } from "apollo-resolvers"
import { baseResolver, isAuthenticatedResolver } from "modules/auth"
import { statusExistedResolver } from "modules/status"

const resolvers = {
  Comment: {
    owner: baseResolver.createResolver(
      ({ ownerId }, args, { models: { User } }) => {
        return User.findById(ownerId)
      },
    ),
  },
  Mutation: {
    /**
     * Create comment
     */
    createComment: and(isAuthenticatedResolver, statusExistedResolver)(
      (root, args, { userId, models: { Comment } }) => {
        const comment = new Comment({ ...args, ownerId: userId })
        return comment.save()
      },
    ),
  },
}

export default resolvers
