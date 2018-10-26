import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const ParticipantSchema = new mongoose.Schema({
  userId: ObjectId,
  name: String,
})

const ConversationSchema = new mongoose.Schema({
  participants: {
    type: Map,
    of: ParticipantSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
})

ConversationSchema.pre("save", function() {
  this.updatedAt = Date.now()
})

const Conversation = mongoose.model("Conversation", ConversationSchema)

export default Conversation
