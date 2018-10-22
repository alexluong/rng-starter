import React from "react"
import { Mutation } from "react-apollo"
import { signInMutation } from "./auth.gql"
// UIs
import { Link } from "@reach/router"
import { Button, Input } from "elements"

class SignInPage extends React.Component {
  state = { email: "", password: "" }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { email, password } = this.state

    return (
      <div>
        <p>Sign In</p>
        <Mutation
          mutation={signInMutation}
          variables={this.state}
          update={(cache, { data: { signInWithEmailAndPassword } }) => {
            const { token, user } = signInWithEmailAndPassword

            localStorage.setItem("accessToken", token)
            localStorage.setItem("me", JSON.stringify(user))

            cache.writeData({ data: { accessToken: token, me: user } })
            this.props.navigate("/")
          }}
        >
          {(signIn, { loading, error }) => (
            <form
              onSubmit={e => {
                e.preventDefault()
                signIn()
              }}
            >
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

              <Button type="submit">Sign In</Button>

              {loading && <p>Loading...</p>}
              {error && <p>{error.graphQLErrors[0].message}</p>}
            </form>
          )}
        </Mutation>

        <Link to="/">Home</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    )
  }
}

export default SignInPage
