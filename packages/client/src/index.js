import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { ToastContainer } from "react-toastify"
import GlobalStyle from "./config/styles"
import Routes from "./Routes"

const client = new ApolloClient({
  uri: "http://localhost:4000",
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
