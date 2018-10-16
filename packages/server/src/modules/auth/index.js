import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const getUserIdFromRequest = request => {
  const Authorization = request.get("Authorization")
  if (!Authorization) {
    return null
  } else {
    const token = Authorization.replace("Bearer ", "")
    try {
      const { userId } = jwt.verify(token, JWT_SECRET)
      return userId
    } catch (error) {
      return null
    }
  }
}

export { getUserIdFromRequest }
export * from "./helperResolvers"
