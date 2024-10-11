import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Auth } from "./pages/auth/Auth"
import { Dashboard } from "./pages/dashboard/dashboard"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
