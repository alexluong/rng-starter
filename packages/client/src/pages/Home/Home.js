import React from "react"
import { Query } from "react-apollo"
import { getStatuses } from "./home.gql"
// UIs
import { Link } from "@reach/router"
import Status from "./components/Status"
import CreateStatus from "./components/CreateStatus"

const HomePage = () => (
  <Query query={getStatuses}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>
      if (error) return <p>Error</p>

      const { statuses } = data

      return (
        <div>
          <p>Home</p>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-out">Sign Out</Link>
          <Link to="/status/hi">Status</Link>
          <hr />

          <CreateStatus />

          <hr />

          <ul>
            {statuses.map(status => (
              <Status key={status.id} status={status} />
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default HomePage
