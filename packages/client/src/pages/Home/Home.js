import React from "react"
import { Query } from "react-apollo"
import { getStatus } from "./home.gql"
// UIs
import { Link } from "@reach/router"

const HomePage = () => (
  <Query query={getStatus}>
    {({ data, loading, error }) => {
      console.log(data, loading, error)

      return (
        <div>
          <p>Home</p>
          <Link to="sign-in">Sign In</Link>
          <Link to="sign-out">Sign Out</Link>
        </div>
      )
    }}
  </Query>
)

export default HomePage
