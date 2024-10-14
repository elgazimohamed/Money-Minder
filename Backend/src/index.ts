import express, { Express } from "express"
import { connectToDB } from "./config/db"
import financialRecordRouter from "./routes/financial-record-routes"

const app: Express = express()

const port: number = 5000

app.use(express.json())

connectToDB()

app.use("/financial-records", financialRecordRouter)

app.listen(port, () =>
  console.log(`Server is running at: http://localhost:${port}`)
)
