import mongoose from "mongoose"

async function connectDatabase() {
  try {
    const DB_URL = process.env.DB_URL

    mongoose.set("useCreateIndex", true)
    await mongoose.connect(
      DB_URL,
      {
        useNewUrlParser: true,
      },
    )

    console.log("Database connected")
  } catch (error) {
    console.error(`Database connection error: ${error}`)
  }
}

connectDatabase()
