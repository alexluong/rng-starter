import mongoose from "mongoose"
import { baseResolver, isAuthenticatedResolver } from "modules/auth"
import { SomeUserNotFoundError } from "./errors"
import { isParticipantOfConversationResolver } from "./helperResolvers"

const resolvers = {
  Conversation: {
    /**
     * Resolve participants
     * 1. Get users
     * 2. Merge user data and participant data
     */
    participants: baseResolver.createResolver(
      async ({ participants }, args, { models: { User } }) => {
        const participantsArr = Array.from(participants).map(
          ([id, obj]) => obj.toObject(), // toObject: transform Mongoose obj to JSON obj
        )

        const users = await User.find({
          _id: {
            $in: participantsArr.map(participant =>
              mongoose.Types.ObjectId(participant.userId),
            ),
          },
        }).lean()

        return participantsArr.map((participant, i) => ({
          ...users[i],
          ...participant,
        }))
      },
    ),
  },
  Participant: {
    id: ({ _id }) => _id,
  },
  Query: {
    /**
     * Get all conversations
     */
    conversations: isAuthenticatedResolver.createResolver(
      (root, args, { models: { Conversation } }) => {
        return Conversation.find().sort("-updatedAt")
      },
    ),
    /**
     * Get conversation by id
     */
    getConversationById: isParticipantOfConversationResolver.createResolver(
      (root, args, { conversation }) => {
        return conversation
      },
    ),
  },
  Mutation: {
    /**
     * Create conversation
     * 1. Find all users
     * 2. Create participants
     * 3. Create conversation
     */
    createConversation: isAuthenticatedResolver.createResolver(
      async (root, { participantIds }, { models: { User, Conversation } }) => {
        // 1. Find all users
        let users
        try {
          users = await User.find({
            _id: {
              $in: participantIds.map(id => mongoose.Types.ObjectId(id)),
            },
          })

          if (users.length !== participantIds.length) throw new Error()
        } catch (error) {
          throw new SomeUserNotFoundError()
        }

        // 2. Create participants
        const participants = users.reduce(
          (obj, user) => ({
            ...obj,
            [user.id]: {
              userId: user.id,
              name: `${user.profile.firstName} ${user.profile.lastName}`,
            },
          }),
          {},
        )

        // 3. Create conversation
        return Conversation.create({ participants })
      },
    ),
  },
}

export default resolvers
