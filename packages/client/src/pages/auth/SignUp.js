import React from "react"
import { Link } from "@reach/router"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
// UIs
import { Button, Input } from "elements"

class SignUpPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { firstName, lastName, email, password, confirmPassword } = this.state

    return (
      <div>
        <p>Sign Up</p>
        <Mutation
          mutation={SIGN_UP_MUTATION}
          variables={this.state}
          update={(cache, { data: { signUpWithEmailAndPassword } }) => {
            const { token, user } = signUpWithEmailAndPassword

            console.log({ token, user })
          }}
          onError={error => {
            console.log({ error })
          }}
        >
          {(signUp, { loading, error }) => (
            <form
              onSubmit={e => {
                e.preventDefault()
                signUp()
              }}
            >
              <Input
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={this.handleInputChange}
              />

              <Input
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={this.handleInputChange}
              />

              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={this.handleInputChange}
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.handleInputChange}
              />

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={this.handleInputChange}
              />

              <Button type="submit">Sign Up</Button>

              {loading && <p>Loading...</p>}
              {error && <p>{error.graphQLErrors[0].message}</p>}
            </form>
          )}
        </Mutation>

        <Link to="/">Home</Link>
        <Link to="/sign-in">Sign In</Link>
      </div>
    )
  }
}

export default SignUpPage

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signUpWithEmailAndPassword(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
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
