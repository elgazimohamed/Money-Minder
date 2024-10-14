import mongoose from "mongoose"
import FinancialRecord from "../types/financialRecord"

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
})

const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "financial-records",
  financialRecordSchema
)

export default FinancialRecordModel
