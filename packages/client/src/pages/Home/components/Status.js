import React from "react"

const Status = ({ status }) => (
  <div>
    <p>Content: {status.content}</p>
    <p>Image: {status.imageURL}</p>
    <p>Last updated: {status.updatedAt}</p>

    <br />
  </div>
)

export default Status
