import { and } from "apollo-resolvers"
import {
  baseResolver,
  isAuthenticatedResolver,
  UnauthorizedError,
} from "modules/auth"
import { ConversationNotFoundError, MessageNotFoundError } from "./errors"

/**
 * Check if conversation existed
 * Get conversationId:
 * - args.conversationId: when dealing with mutations
 * - root.conversationId: when dealing with Message's resolvers
 * - root.id            : when dealing with Conversation's resolvers
 */
export const conversationExistedResolver = isAuthenticatedResolver.createResolver(
  async (root, args, context) => {
    if (!context.conversation) {
      const Conversation = context.models.Conversation

      const conversationId =
        args.conversationId || root.conversationId || root.id
      const conversation = await Conversation.findById(conversationId)

      if (!conversation) {
        throw new ConversationNotFoundError()
      }

      context.conversation = conversation
    }
  },
)

export const isParticipantOfConversationResolver = conversationExistedResolver.createResolver(
  (root, args, { userId, conversation }) => {
    if (!conversation.participants.has(userId)) {
      throw new UnauthorizedError()
    }
  },
)

/**
 * Check if message existed
 * Get messageId:
 * - args.messageId: when dealing with mutations
 * - root.id       : when dealing with Message's resolvers
 */
export const messageExistedResolver = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.message) {
      const Message = context.models.Message

      const messageId = args.messageId || root.id
      const message = await Message.findById(messageId)

      if (!message) {
        throw new MessageNotFoundError()
      }

      context.message = message
    }
  },
)

export const isMessageOwnerResolver = and(
  isAuthenticatedResolver,
  messageExistedResolver,
)((root, args, { message, userId }) => {
  if (message.ownerId.toString() !== userId.toString()) {
    throw new UnauthorizedError()
  }
})
