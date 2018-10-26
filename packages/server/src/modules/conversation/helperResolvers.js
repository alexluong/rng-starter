import { isAuthenticatedResolver, UnauthorizedError } from "modules/auth"

export const isParticipantOfConversationResolver = isAuthenticatedResolver.createResolver(
  async (root, { conversationId }, context) => {
    const {
      userId,
      models: { Conversation },
    } = context

    const conversation = await Conversation.findById(conversationId)

    if (!conversation.participants.has(userId)) {
      throw new UnauthorizedError()
    }

    context.conversation = conversation
  },
)
