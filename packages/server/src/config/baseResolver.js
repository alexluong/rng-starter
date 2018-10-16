import { createResolver } from "apollo-resolvers"
import { createError, isInstance } from "apollo-errors"

const UnknownError = createError("UnknownError", {
  message: "Unknown error.",
})

const baseResolver = createResolver(
  null,
  (root, args, context, error) =>
    isInstance(error) ? error : new UnknownError(),
)

export default baseResolver
