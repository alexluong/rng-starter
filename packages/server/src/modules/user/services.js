import User from "./model"

export async function createUser({ firstName, lastName, email, password }) {
  const user = new User({
    email,
    password,
    profile: { firstName, lastName },
  })

  const savedUser = await user.save()
  return savedUser
}
