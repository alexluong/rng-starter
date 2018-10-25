import {
  isAuthenticatedResolver,
  isAuthenticatedWithUserResolver,
} from "modules/auth"

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
    updateUser: isAuthenticatedWithUserResolver.createResolver(
      (root, { firstName, lastName }, { user }) => {
        if (firstName) user.profile.firstName = firstName
        if (lastName) user.profile.lastName = lastName

        return user.save()
      },
    ),
  },
}

export default resolvers
