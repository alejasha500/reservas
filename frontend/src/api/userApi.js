// src/api/authApi.js

import api from './axiosConfig'

export const registerApi = async (name, email, password) => {
  const response = await api.post('/users/register', { name, email, password })
  return response.data
}

export const loginApi = async (email, password) => {
  const response = await api.post('/users/login', { email, password })
  return response.data
}

export const logoutApi = async () => {
  const response = await api.post('/users/logout')
  return response.data
}

export const getProfileApi = async () => {
  const response = await api.get('/users/profile')
  return response.data
}

export const updateProfileApi = async (name, email) => {
  const response = await api.put('/users/profile', { name, email })
  return response.data
}

export const changePasswordApi = async (currentPassword, newPassword) => {
  const response = await api.post('/users/change-password', { 
    currentPassword, 
    newPassword 
  })
  return response.data
}

export const deleteProfileApi = async () => {
  const response = await api.delete('/users/profile')
  return response.data
}

export const verifyTokenApi = async () => {
  const response = await api.get('/users/verify')
  return response.data
}

// Admin
export const getAllUsersApi = async () => {
  const response = await api.get('/users/admin/users')
  return response.data
}

export const getUserByIdApi = async (id) => {
  const response = await api.get(`/users/admin/users/${id}`)
  return response.data
}

export const deleteUserApi = async (id) => {
  const response = await api.delete(`/users/admin/users/${id}`)
  return response.data
}