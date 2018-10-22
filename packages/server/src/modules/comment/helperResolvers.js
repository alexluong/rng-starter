import { and } from "apollo-resolvers"
import {
  baseResolver,
  isAuthenticatedResolver,
  UnauthorizedError,
} from "modules/auth"
import { StatusNotFoundError } from "modules/status"
import { CommentNotFoundError, NotCommentOwnerError } from "./errors"

export const commentExistedResolver = baseResolver.createResolver(
  async (root, { commentId }, { models: { Comment } }) => {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      throw new CommentNotFoundError()
    }
  },
)

export const isCommentOwnerResolver = and(
  isAuthenticatedResolver,
  commentExistedResolver,
)(async (root, { commentId }, { userId, models: { Comment } }) => {
  const comment = await Comment.findById(commentId)

  if (comment.ownerId.toString() !== userId) {
    throw new UnauthorizedError()
  }
})

export const isCommentStatusOwnerResolver = and(
  isAuthenticatedResolver,
  commentExistedResolver,
)(async (root, { commentId }, { userId, models: { Comment, Status } }) => {
  const comment = await Comment.findById(commentId)
  const status = await Status.findById(comment.statusId)

  if (!status) {
    throw new StatusNotFoundError()
  }

  if (status.ownerId.toString() !== userId) {
    throw new UnauthorizedError()
  }
})
