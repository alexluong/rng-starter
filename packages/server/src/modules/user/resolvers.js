import { isAuthenticatedResolver } from "modules/auth"

const resolvers = {
  Query: {
    /**
     * Get all users
     * TODO: Fix permission
     */
    users: isAuthenticatedResolver.createResolver(
      (root, args, { models: { User } }) => {
        return User.find()
      },
    ),
  },
  Mutation: {
    /**
     * Update User
     * TODO: Fix permission
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
