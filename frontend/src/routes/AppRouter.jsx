import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import UserDashboard from "../pages/user/UserDashboard";
import Profile from "../pages/user/Profile";
import ChangePassword from "../pages/user/ChangePassword";
import MyReservations from "../pages/user/MyReservations";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageReservations from "../pages/admin/ManageReservations";
import ManageTables from "../pages/admin/ManageTables";

export default function AppRouter() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Usuario protegido */}
      <Route element={<PrivateRoute requiredRole="user" />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
        <Route path="/user/my-reservations" element={<MyReservations />} />
      </Route>

      {/* Admin protegido */}
      <Route element={<PrivateRoute requiredRole="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/reservations" element={<ManageReservations />} />
        <Route path="/admin/tables" element={<ManageTables />} />
      </Route>
    </Routes>
  );
}