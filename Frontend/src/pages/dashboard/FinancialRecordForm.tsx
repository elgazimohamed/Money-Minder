import { useState } from "react"
import { useUser } from "@clerk/clerk-react"

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  const { user } = useUser()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newRecord = {
      userId: user?.id,
      date: new Date().toISOString(),
      description: description,
      ammout: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    }

    console.log(newRecord)

    // Empty the inputs
    setDescription("")
    setAmount("")
    setCategory("")
    setPaymentMethod("")
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  )
}
