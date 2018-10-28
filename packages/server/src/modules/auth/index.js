import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export const getUserIdFromToken = token => {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET)
    return userId
  } catch (error) {
    return ""
  }
}

export * from "./helperResolvers"
export * from "./errors"
