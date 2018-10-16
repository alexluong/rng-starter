import jwt from "jsonwebtoken"
import { isNotAuthenticatedResolver } from "./helperResolvers"
import { AuthenticationFailedError, UserAlreadyExistedError } from "./errors"
import { createUser } from "modules/user"

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Mutation: {
    /**
     * Sign In
     */
    signInWithEmailAndPassword: isNotAuthenticatedResolver.createResolver(
      async (root, { email, password }, { models: { User } }) => {
        const user = await User.findOne({ email })

        if (!user) {
          throw new AuthenticationFailedError()
        }

        const isCorrectPassword = await user.isCorrectPassword(password)

        if (isCorrectPassword) {
          return createAuthPayload(user)
        } else {
          throw new AuthenticationFailedError()
        }
      },
    ),
    /**
     * Sign Up
     */
    signUpWithEmailAndPassword: isNotAuthenticatedResolver.createResolver(
      async (
        root,
        { firstName, lastName, email, password },
        { models: { User } },
      ) => {
        const existedUser = await User.findOne({ email })

        if (existedUser) {
          throw new UserAlreadyExistedError()
        }

        const user = await createUser({ firstName, lastName, email, password })
        return createAuthPayload(user)
      },
    ),
  },
}

export default resolvers

function createAuthPayload(user) {
  return {
    token: jwt.sign({ userId: user.id }, JWT_SECRET),
    user,
  }
}
