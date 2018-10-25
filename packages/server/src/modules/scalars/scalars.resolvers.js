import { EmailAddress, PhoneNumber, URL } from "@okgrow/graphql-scalars"
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date"

const resolvers = {
  EmailAddress,
  PhoneNumber,
  URL,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
}

export default resolvers
