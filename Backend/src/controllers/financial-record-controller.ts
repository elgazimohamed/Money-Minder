import FinancialRecordModel from "../models/financial-record-model"
import FinancialRecord from "../types/financialRecord"
import { Request, Response } from "express"

export const getAllRecordsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId

    if (!userId || userId.length === 0) {
      console.error("Error: User ID is missing in request params")
      res.status(400).json({ success: false, message: "Bad Request" })
      return
    }

    // Fetch records for the user
    const records: Array<FinancialRecord> = await FinancialRecordModel.find({
      userId: userId,
    })

    // Check if records are found
    if (!records || records.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No financial records found." })
      return
    }

    res.status(200).json({ success: true, records })
  } catch (error) {
    console.error("Error fetching financial records:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export const createNewFinancialRecord = async (req: Request, res: Response) => {
  try {
    const newRecordBody: FinancialRecord = req.body
    const newRecord = new FinancialRecordModel(newRecordBody)
    const savedRecord = await newRecord.save()
    res.status(201).json({
      success: true,
      message: "The record has been added successfully",
      savedRecord,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error })
  }
}
export const updateFinancialRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (!id) {
      console.error("Error: Record ID is required for updating")
      res.status(400).json({
        success: false,
        message: "Bad Request: Unable to update record",
      })
      return
    }

    const newRecordBody = req.body
    const newRecord = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: "The record has been modified successfully",
      newRecord,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error })
  }
}

export const deleteFinancialRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (!id) {
      console.error("Error: Record ID is required for record deletion.")
      res.status(400).json({
        success: false,
        message: "Bad Request: Unable to delete record",
      })
      return
    }

    const record = await FinancialRecordModel.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      record,
    })
  } catch (error) {
    console.error("Error occurred during record deletion:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
