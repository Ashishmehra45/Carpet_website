import { Route } from 'lucide-react'
import React from 'react'
import AdminDashboard from '../routes/AdminDashboard'
import { Routes , Route } from 'react-router-dom'

function AppRotes() {
  return (
    <Routes>
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default AppRotes