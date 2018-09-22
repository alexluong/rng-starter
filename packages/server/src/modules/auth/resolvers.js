const jwt = require("jsonwebtoken")

const APP_SECRET = process.env.APP_SECRET

function createAuthPayload(user) {
  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

const resolvers = {
  Mutation: {
    signInWithEmailAndPassword: async (
      parents,
      { email, password },
      { User },
    ) => {
      const user = await User.findOne({ email })
      const isCorrectPassword = await user.isCorrectPassword(password)

      if (isCorrectPassword) {
        return createAuthPayload(user)
      } else {
        throw new Error("Incorrect Password")
      }
    },
  },
}

export default resolvers
