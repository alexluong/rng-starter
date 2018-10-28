import "config/index.js"
import "config/database.js"

import path from "path"
import { GraphQLServer, PubSub } from "graphql-yoga"
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas"
import { formatError } from "apollo-errors"
import { getUserIdFromToken } from "./modules/auth"

// Schema
const typesArray = fileLoader(path.join(__dirname, "modules/**/*.schema.gql"))
const typeDefs = mergeTypes(typesArray, { all: true })

// Resolvers
const resolversArray = fileLoader(
  path.join(__dirname, "modules/**/*.resolvers.js"),
)
const resolvers = mergeResolvers(resolversArray)

// Context (Mongoose Models)
const modelsArray = fileLoader(path.join(__dirname, "modules/**/*.model.js"))
const modelsObject = modelsArray.reduce((a, model) => {
  a[model.modelName] = model
  return a
}, {})

// Server
const pubsub = new PubSub()
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: ({ request, connection }) => {
    const context = {}
    let token

    if (connection) {
      token = connection.context.Authorization
    } else {
      token = request.get("Authorization")
    }

    context.pubsub = pubsub
    context.models = modelsObject
    context.userId = token
      ? getUserIdFromToken(token.replace("Bearer ", ""))
      : ""

    return context
  },
})

// Options
const PORT = 4000
const options = {
  port: PORT,
  formatError,
}

server.start(options, ({ port }) =>
  console.log(`🚀 Server is running on http://localhost:${port}`),
)
