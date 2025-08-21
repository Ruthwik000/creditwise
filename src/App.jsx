
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CompanyDashboard from './pages/CompanyDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companydashboard/:id" element={<CompanyDashboard />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App