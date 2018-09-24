import React from "react"
import { css, cx } from "react-emotion"
import { Link } from "react-router-dom"
import { TextField, Button, Divider } from "react-md"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import AuthLayout from "./components/AuthLayout"

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signInWithEmailAndPassword(email: $email, password: $password) {
      token
      user {
        email
        profile {
          firstName
          lastName
        }
      }
    }
  }
`

class SignInPage extends React.Component {
  state = { email: "", password: "" }

  handleInputChange = name => value => {
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state

    return (
      <Mutation mutation={SIGN_IN_MUTATION} variables={this.state}>
        {signIn => (
          <AuthLayout title="Sign In">
            <h1 className={centerAlignCss} style={{ marginTop: "3rem" }}>
              Sign In
            </h1>

            <form
              className={formCss}
              onSubmit={async e => {
                e.preventDefault()
                const response = await signIn()
                console.log(response)
              }}
            >
              <TextField
                id="floating-email"
                type="email"
                label="Email"
                lineDirection="center"
                value={email}
                onChange={this.handleInputChange("email")}
              />
              <TextField
                id="floating-password"
                type="password"
                label="Password"
                lineDirection="center"
                value={password}
                onChange={this.handleInputChange("password")}
              />

              <Button raised primary type="submit" style={{ marginTop: 20 }}>
                Sign In
              </Button>
            </form>

            <Divider />

            <div className={cx(centerAlignCss, footerCss)}>
              <p>
                New to us? <Link to="sign-up">Create an account.</Link>
              </p>
            </div>
          </AuthLayout>
        )}
      </Mutation>
    )
  }
}

export default SignInPage

const formCss = css`
  padding: 0 3rem 3rem 3rem;
`

const centerAlignCss = css`
  text-align: center;
`

const footerCss = css`
  padding: 2rem;
`
