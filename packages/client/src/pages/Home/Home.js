import React from "react"
import { Link } from "react-router-dom"
import { Button, FontIcon } from "react-md"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

const USER_QUERY = gql`
  {
    users {
      email
      profile {
        firstName
        lastName
      }
    }
  }
`

const HomePage = () => (
  <Query query={USER_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>

      if (error) {
        console.error(`ERROR: ${error}`)
        return <p>Error :(</p>
      }

      return (
        <div>
          <Button raised primary iconChildren="home" iconBefore={false}>
            Home
          </Button>
          <FontIcon primary>home</FontIcon>
          <br />
          {data.users.map(user => (
            <p key={user.email}>{user.email}</p>
          ))}
          <Link to="sign-in">Sign In</Link>
        </div>
      )
    }}
  </Query>
)

export default HomePage
