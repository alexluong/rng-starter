import { and } from "apollo-resolvers"
import {
  baseResolver,
  isAuthenticatedResolver,
  UnauthorizedError,
} from "modules/auth"
import { StatusNotFoundError } from "modules/status"
import { CommentNotFoundError, NotCommentOwnerError } from "./errors"

export const commentExistedResolver = baseResolver.createResolver(
  async (root, { commentId }, context) => {
    const comment = await context.models.Comment.findById(commentId)
    if (!comment) {
      throw new CommentNotFoundError()
    }
    context.comment = comment
  },
)

export const isCommentOwnerResolver = and(
  isAuthenticatedResolver,
  commentExistedResolver,
)((root, args, { userId, comment }) => {
  if (comment.ownerId.toString() !== userId) {
    throw new UnauthorizedError()
  }
})

export const isCommentStatusOwnerResolver = and(
  isAuthenticatedResolver,
  commentExistedResolver,
)(async (root, args, context) => {
  const {
    userId,
    comment,
    models: { Status },
  } = context

  const status = await Status.findById(comment.statusId)

  if (!status) {
    throw new StatusNotFoundError()
  }

  if (status.ownerId.toString() !== userId) {
    throw new UnauthorizedError()
  }

  context.status = status
})
