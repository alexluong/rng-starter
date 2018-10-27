import React from "react"
import { Link } from "@reach/router"
import { Query } from "react-apollo"
import { getStatusById } from "./status.gql"
// UIs
import CreateComment from "./components/CreateComment"
import Comment from "./components/Comment"

const StatusPage = ({ statusId, ...props }) => (
  <Query query={getStatusById} variables={{ statusId }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>
      if (error) return <p>Error</p>
      if (!data.status) return <p>No status</p>

      const { status } = data

      return (
        <div>
          <Link to="/">Back to Home</Link>

          <hr />

          <p>Content: {status.content}</p>
          <p>Image: {status.imageUrl}</p>
          <p>Last updated: {status.updatedAt}</p>
          <p>Comments:</p>

          <hr />

          <CreateComment statusId={statusId} />

          <hr />

          <ul style={{ paddingLeft: 20 }}>
            {status.comments.map(comment => (
              <Comment key={comment.id} comment={comment} statusId={statusId} />
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default StatusPage
