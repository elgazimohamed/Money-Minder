import express from "express"
import FinancialRecordModel from "../models/financial-record-model"
import {
  getAllRecordsByUser,
  createNewFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
} from "../controllers/financial-record-controller"

const router = express.Router()

router.get("/getAllByUser/:userId", getAllRecordsByUser)

router.post("/", createNewFinancialRecord)

router.put("/:id", updateFinancialRecord)

router.delete("/:id", deleteFinancialRecord)

export default router
