import React from "react"
import { State } from "react-powerplug"
import { Mutation } from "react-apollo"
import { createStatus } from "../home.gql"
// UIs
import { Input, Button } from "elements"

const CreateStatus = () => (
  <State initial={{ content: "" }}>
    {({ state: { content }, setState }) => (
      <Mutation
        mutation={createStatus}
        variables={{ content }}
        refetchQueries={["getStatus"]}
      >
        {createStatus => (
          <form
            onSubmit={e => {
              e.preventDefault()
              createStatus()
            }}
          >
            <Input
              placeholder="What's up?"
              value={content}
              onChange={e => setState({ content: e.target.value })}
            />

            <Button type="submit">Create</Button>
          </form>
        )}
      </Mutation>
    )}
  </State>
)

export default CreateStatus
