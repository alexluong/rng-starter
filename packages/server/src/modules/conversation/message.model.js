import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: ObjectId,
    required: true,
  },
  text: String,
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

MessageSchema.pre("save", function() {
  this.updatedAt = Date.now()
})

const Message = mongoose.model("Message", MessageSchema)

export default Message
