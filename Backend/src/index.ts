import express, { Express } from "express"
import cors from "cors"
import { connectToDB } from "./config/db"
import financialRecordRouter from "./routes/financial-record-routes"

const app: Express = express()

const port: number = 5000

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // For legacy browser support
}

app.use(express.json())

app.use(cors(corsOptions))

app.use("/financial-records", financialRecordRouter)

connectToDB()

app.listen(port, () =>
  console.log(`Server is running at: http://localhost:${port}`)
)
