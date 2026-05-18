import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;