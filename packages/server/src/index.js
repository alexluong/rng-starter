import "config/index.js"
import "config/database.js"

import path from "path"
import { GraphQLServer } from "graphql-yoga"
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas"

// Schema
const typesArray = fileLoader(path.join(__dirname, "modules/**/*.graphql"))
const typeDefs = mergeTypes(typesArray, { all: true })

// Resolvers
const resolversArray = fileLoader(
  path.join(__dirname, "modules/**/resolvers.js"),
)
const resolvers = mergeResolvers(resolversArray)

// Context (Mongoose Models)
const modelsArray = fileLoader(path.join(__dirname, "modules/**/model.js"))
const modelsObject = modelsArray.reduce((a, model) => {
  a[model.modelName] = model
  return a
}, {})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request,
    ...modelsObject,
  }),
})

server.start(() => console.log("Server is running on http://localhost:4000"))
