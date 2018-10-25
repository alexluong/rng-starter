import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
  },
  password: {
    type: String,
    select: false,
  },
  profile: {
    firstName: String,
    lastName: String,
    avatarURL: String,
  },
})

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.isCorrectPassword = async function(candidatePassword) {
  const user = await User.findById(this.id)
    .select("password")
    .exec()
  return await bcrypt.compare(candidatePassword, user.password)
}

const User = mongoose.model("User", UserSchema)
export default User
