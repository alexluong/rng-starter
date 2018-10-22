import React from "react"
import ReactDOM from "react-dom"
// Apollo
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import clientState from "./state"
// React
import { ToastContainer } from "react-toastify"
import GlobalStyle from "./config/styles"
import Routes from "./Routes"

const client = new ApolloClient({
  uri: "http://localhost:4000", // TODO: Set according to env
  clientState,
  request: async operation => {
    const accessToken = localStorage.getItem("accessToken")

    operation.setContext({
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    })
  },
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </React.Fragment>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
