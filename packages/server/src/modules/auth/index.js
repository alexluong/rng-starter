import jwt from "jsonwebtoken"

const APP_SECRET = process.env.APP_SECRET

const authenticated = fn => async (parents, args, context, info) => {
  const Authorization = context.request.get("Authorization")
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "")
    const { userId } = jwt.verify(token, APP_SECRET)
    context.userId = userId
    return await fn(parents, args, context, info)
  } else {
    throw new Error("Not authenticated")
  }
}

export { authenticated }
