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
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
})

CommentSchema.pre("save", function() {
  this.updatedAt = Date.now()
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment
