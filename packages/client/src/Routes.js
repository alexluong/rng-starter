import React from "react"
import { Router, Redirect } from "@reach/router"
import { Query } from "react-apollo"
import { meQuery } from "./state/me"
// Pages
import HomePage from "pages/Home"
import SignInPage from "pages/auth/SignIn"
import SignUpPage from "pages/auth/SignUp"
import SignOutPage from "pages/auth/SignOut"
import NotFoundPage from "pages/NotFound"

const Routes = () => (
  <Query query={meQuery}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>
      if (error) return <p>Error</p>
      const isAuthed = data ? Boolean(data.me) : false

      return (
        <Router>
          <HomePage path="/" />

          {/* Auth */}
          {isAuthed ? (
            <Redirect from="/sign-in" to="/" />
          ) : (
            <SignInPage path="/sign-in" />
          )}
          {isAuthed ? (
            <Redirect from="/sign-up" to="/" />
          ) : (
            <SignUpPage path="/sign-up" />
          )}
          {isAuthed ? (
            <SignOutPage path="/sign-out" />
          ) : (
            <Redirect from="/sign-out" to="/" />
          )}

          <NotFoundPage default />
        </Router>
      )
    }}
  </Query>
)

export default Routes
