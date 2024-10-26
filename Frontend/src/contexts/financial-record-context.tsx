import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { FinancialRecord } from "../models/FinancialRecord"

interface FinancialRecordsContextType {
  records: FinancialRecord[]
  addRecord: (record: FinancialRecord) => void
  // updateRecord: (id: string, newRecord: FinancialRecord) => void
  // deleteRecord: (id: string) => void
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined)

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const BACKEND_API_URL = "http://localhost:5000"
  const [records, setRecords] = useState<FinancialRecord[]>([])
  const { user } = useUser()
  useEffect(() => {
    if (user && user.id) {
      fetchRecords(user.id)
    }
  }, [user])

  const fetchRecords = async (userId: string) => {
    const response = await fetch(
      `${BACKEND_API_URL}/financial-records/getAllByUser/${userId}`
    )
    try {
      if (response.ok) {
        const { records } = await response.json()
        console.log(records)
        setRecords(records)
      }
    } catch (error) {
      console.error("Error fetching records:", error)
    }
  }

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch(`${BACKEND_API_URL}/financial-records/`, {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "Application/json",
      },
    })

    try {
      if (response.ok) {
        const { savedRecord } = await response.json()
        console.log(savedRecord)
        setRecords((prev: FinancialRecord[]) => [...prev, savedRecord])
      }
    } catch (error) {
      console.error("Error when creating new record:", error)
    }
  }

  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordsContext.Provider>
  )
}

export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext)

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    )
  }

  return context
}
