import { withFilter } from "graphql-yoga"
import { and } from "apollo-resolvers"
import { isAuthenticatedResolver } from "modules/auth"
import {
  isParticipantOfConversationResolver,
  isMessageOwnerResolver,
  messageExistedResolver,
  conversationExistedResolver,
} from "./helperResolvers"

const MESSAGE_CREATED = "MESSAGE_CREATED"
const MESSAGE_UPDATED = "MESSAGE_UPDATED"

const resolvers = {
  Message: {
    /**
     * Return Participant in Conversation
     * 1. Get participant obj from conversation
     * 2. If !args.simple => Find user
     * 3. Merge
     */
    owner: and(messageExistedResolver, conversationExistedResolver)(
      async ({ ownerId }, args, { conversation, models: { User } }) => {
        console.log("owner")
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
     * 1. Create message
     * 2. Notify pubsub (for subscription)
     * 3. Return newly created message
     */
    createMessage: isParticipantOfConversationResolver.createResolver(
      async (
        root,
        { conversationId, text },
        { pubsub, userId, models: { Message } },
      ) => {
        const createdMessage = await Message.create({
          conversationId,
          text,
          ownerId: userId,
        })
        await pubsub.publish(MESSAGE_CREATED, {
          messageCreated: createdMessage,
        })
        return createdMessage
      },
    ),
    /**
     * Update message
     */
    updateMessage: isMessageOwnerResolver.createResolver(
      async (root, { text }, { pubsub, message }) => {
        message.text = text
        const updatedMessage = await message.save()
        await pubsub.publish(MESSAGE_UPDATED, {
          messageUpdated: updatedMessage,
        })
        return updatedMessage
      },
    ),
  },
  Subscription: {
    /**
     * Message create subscription
     */
    messageCreated: {
      subscribe: isAuthenticatedResolver.createResolver(
        (root, args, { pubsub }) => {
          return pubsub.asyncIterator(MESSAGE_CREATED)
        },
      ),
    },
    /**
     * Message update subscription
     */
    messageUpdated: {
      subscribe: isAuthenticatedResolver.createResolver(
        (root, args, context) => {
          const { pubsub } = context

          return withFilter(
            () => pubsub.asyncIterator(MESSAGE_UPDATED),
            ({ messageUpdated }, { messageId }) => {
              return messageUpdated.id.toString() === messageId
            },
          )(root, args, context)
        },
      ),
    },
  },
}

export default resolvers
