import { authenticated } from "../auth"

const resolvers = {
  Query: {
    users: async (parent, args, { User }) => {
      const users = await User.find()
      return users
    },
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const user = await new User(args).save()
      return user
    },
    updateUser: authenticated(
      async (parents, { profile }, { User, userId }) => {
        try {
          const user = await User.findById(userId)
          user.profile = {
            ...user.profile,
            ...profile,
          }
          await user.save()
          return user
        } catch (error) {
          console.error(error)
        }
      },
    ),
  },
}

export default resolvers
