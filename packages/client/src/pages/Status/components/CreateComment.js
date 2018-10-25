import React from "react"
import { State } from "react-powerplug"
import { Mutation } from "react-apollo"
import { createComment } from "../comment.gql"
import { getStatusById } from "../status.gql"
// UIs
import { Input, Button } from "elements"

const CreateComment = ({ statusId }) => (
  <State initial={{ content: "" }}>
    {({ state: { content }, setState }) => (
      <Mutation
        mutation={createComment}
        variables={{ statusId, content }}
        refetchQueries={[{ query: getStatusById, variables: { statusId } }]}
        awaitRefetchQueries
        onCompleted={() => setState({ content: "" })}
      >
        {(createComment, { loading, error }) => (
          <form
            onSubmit={async e => {
              e.preventDefault()
              createComment()
            }}
          >
            <Input
              placeholder="Whatchu think?"
              value={content}
              onChange={e => setState({ content: e.target.value })}
            />

            <Button type="submit">Create</Button>

            {loading && <p>Loading</p>}
            {error && <p>{error.graphQLErrors[0].message}</p>}
          </form>
        )}
      </Mutation>
    )}
  </State>
)

export default CreateComment
