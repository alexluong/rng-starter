import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new mongoose.Schema({
  postId: ObjectId,
  content: String,
  imageURL: String,
  ownerId: {
    type: ObjectId,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment
