import { baseResolver, isAuthenticatedResolver } from "modules/auth"

const resolvers = {
  Query: {
    users: async (root, args, { models: { User } }) => {
      const users = await User.find()
      return users
    },
  },
  Mutation: {
    /**
     * Update User
     */
    updateUser: isAuthenticatedResolver.createResolver(
      async (root, { profile }, { userId, models: { User } }) => {
        const user = await User.findById(userId)
        user.profile = {
          ...user.profile,
          ...profile,
        }
        await user.save()
        return user
      },
    ),
  },
}

export default resolvers
