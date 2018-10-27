import { isAuthenticatedResolver, UnauthorizedError } from "modules/auth"
import { ConversationNotFoundError } from "./errors"

/**
 * Check if conversation existed
 * Get conversationId:
 * - args.conversationId: when dealing with mutations
 * - root.conversationId: when dealing with Message's resolvers
 * - root.id            : when dealing with Conversation's resolvers
 */
export const conversationExistedResolver = isAuthenticatedResolver.createResolver(
  async (root, args, context) => {
    const Conversation = context.models.Conversation

    const conversationId = args.conversationId || root.conversationId || root.id
    const conversation = await Conversation.findById(conversationId)

    if (!conversation) {
      throw new ConversationNotFoundError()
    }

    context.conversation = conversation
  },
)

export const isParticipantOfConversationResolver = conversationExistedResolver.createResolver(
  (root, args, { userId, conversation }) => {
    if (!conversation.participants.has(userId)) {
      throw new UnauthorizedError()
    }
  },
)
