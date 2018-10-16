import React from "react"
import { Router } from "@reach/router"
// Pages
import HomePage from "pages/Home"
import SignInPage from "pages/auth/SignIn"
import SignUpPage from "pages/auth/SignUp"
import NotFoundPage from "pages/NotFound"

const Routes = () => (
  <Router>
    <HomePage path="/" />
    <SignInPage path="/sign-in" />
    <SignUpPage path="/sign-up" />
    <NotFoundPage default />
  </Router>
)

export default Routes
