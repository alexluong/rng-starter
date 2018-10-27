import { isParticipantOfConversationResolver } from "./helperResolvers"

const resolvers = {
  Message: {
    /**
     * Return Participant in Conversation
     * 1. Get participant obj from conversation
     * 2. If !args.simple => Find user
     * 3. Merge
     */
    owner: isParticipantOfConversationResolver.createResolver(
      async ({ ownerId }, args, { conversation, models: { User } }) => {
        const participant = conversation.participants
          .get(ownerId.toString())
          .toObject()

        const user = args.simple
          ? {}
          : await User.findById(participant.userId).lean()

        return {
          ...user,
          ...participant,
          id: participant.userId,
        }
      },
    ),
  },
  Mutation: {
    /**
     * Create message
     */
    createMessage: isParticipantOfConversationResolver.createResolver(
      (root, { conversationId, text }, { userId, models: { Message } }) => {
        return Message.create({ conversationId, text, ownerId: userId })
      },
    ),
  },
}

export default resolvers
