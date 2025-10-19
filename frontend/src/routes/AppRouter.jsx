// src/routes/AppRouter.jsx

import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Usuario
import UserDashboard from '../pages/user/UserDashboard'
import Profile from '../pages/user/Profile'
import ChangePassword from '../pages/user/ChangePassword'
import MyReservations from '../pages/user/MyReservations'

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageReservations from '../pages/admin/ManageReservations'
import ManageTables from '../pages/admin/ManageTables'

export default function AppRouter() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Usuario (después protegeremos) */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/change-password" element={<ChangePassword />} />
      <Route path="/user/my-reservations" element={<MyReservations />} />
      
      {/* Admin (después protegeremos) */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/reservations" element={<ManageReservations />} />
      <Route path="/admin/tables" element={<ManageTables />} />
    </Routes>
  )
}