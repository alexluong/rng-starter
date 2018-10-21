import { createResolver } from "apollo-resolvers"
import { createError, isInstance } from "apollo-errors"

const UnknownError = createError("UnknownError", {
  message: "Unknown error.",
})

const baseResolver = createResolver(null, (root, args, context, error) => {
  if (isInstance(error)) {
    return error
  } else {
    console.log(error)
    return new UnknownError()
  }
})

export default baseResolver
