import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new mongoose.Schema({
  statusId: ObjectId,
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

CommentSchema.pre("validate", function() {
  const now = new Date().getTime()
  this.createdAt = now
  this.updatedAt = now
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment
