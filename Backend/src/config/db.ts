import mongoose from "mongoose"

const mongoURI: string = ""
export const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDB !!!")
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err)
  }
}
