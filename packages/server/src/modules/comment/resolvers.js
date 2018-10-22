import { and, or } from "apollo-resolvers"
import { baseResolver, isAuthenticatedResolver } from "modules/auth"
import { statusExistedResolver } from "modules/status"
import {
  isCommentOwnerResolver,
  isCommentStatusOwnerResolver,
} from "./helperResolvers"

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
    /**
     * Delete comment
     */
    deleteComment: or(isCommentOwnerResolver, isCommentStatusOwnerResolver)(
      (root, { commentId }, { models: { Comment } }) => {
        return Comment.findByIdAndDelete(commentId)
      },
    ),
  },
}

export default resolvers
