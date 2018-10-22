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
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
})

StatusSchema.pre("save", function() {
  this.updatedAt = Date.now()
})

const Status = mongoose.model("Status", StatusSchema)

export default Status
