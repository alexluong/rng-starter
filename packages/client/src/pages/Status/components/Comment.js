import React from "react"
import { Mutation } from "react-apollo"
import { deleteComment } from "../comment.gql"
import { getStatusById } from "../status.gql"
// UIs
import { Button } from "elements"

const Comment = ({ comment, statusId }) => (
  <Mutation
    mutation={deleteComment}
    variables={{ commentId: comment.id }}
    refetchQueries={[{ query: getStatusById, variables: { statusId } }]}
  >
    {(deleteComment, { loading, error }) => (
      <div>
        <p>
          {comment.content} - {comment.owner.email} -{" "}
          <Button onClick={deleteComment}>Delete</Button>
          {loading && <span> - Loading</span>}
          {error && <span> - {error.graphQLErrors[0].message}</span>}
        </p>
      </div>
    )}
  </Mutation>
)

export default Comment
