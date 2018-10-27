import React from "react"
import { Link } from "@reach/router"
import { Mutation } from "react-apollo"
import { deleteStatus } from "../home.gql"
// UIs
import { Button } from "elements"

const Status = ({ status }) => (
  <Mutation
    mutation={deleteStatus}
    variables={{ statusId: status.id }}
    refetchQueries={["getStatus"]}
  >
    {(deleteStatus, { loading, error }) => (
      <div>
        <p>Content: {status.content}</p>
        <p>Image: {status.imageUrl}</p>
        <p>Last updated: {status.updatedAt}</p>
        <Button as={Link} to={`/status/${status.id}`}>
          More
        </Button>
        <Button onClick={deleteStatus}>Delete</Button>
        {loading && <p>Loading...</p>}
        {error && <p>{error.graphQLErrors[0].message}</p>}

        <br />
        <br />
      </div>
    )}
  </Mutation>
)

export default Status
