import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";

import UserDashboard from "../pages/user/UserDashboard.jsx";
import MyReservations from "../pages/user/MyReservations.jsx";
import NewReservation from "../pages/user/NewReservations.jsx";
import Profile from "../pages/user/Profile.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageReservations from "../pages/admin/ManageReservations.jsx";
import ManageTables from "../pages/admin/ManageTables.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";

const AppRouter = () => (
  <Routes>
    {/* Públicas */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Usuario */}
    <Route element={<PrivateRoute requiredRole="user" />}>
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/new-reservation" element={<NewReservation />} />
      <Route path="/user/my-reservations" element={<MyReservations />} />
      <Route path="/user/profile" element={<Profile />} />
    </Route>

    {/* Admin */}
    <Route element={<PrivateRoute requiredRole="admin" />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/reservations" element={<ManageReservations />} />
      <Route path="/admin/tables" element={<ManageTables />} />
      <Route path="/admin/users" element={<ManageUsers />} />
    </Route>
  </Routes>
);

export default AppRouter;