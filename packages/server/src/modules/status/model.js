import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

const StatusSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
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

StatusSchema.pre("validate", function() {
  const now = new Date().getTime()
  this.createdAt = now
  this.updatedAt = now
})

const Status = mongoose.model("Status", StatusSchema)

export default Status
