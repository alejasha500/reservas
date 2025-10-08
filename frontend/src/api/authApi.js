const API_URL = "http://localhost:3000/reservas/usuarios"

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.error || "Error al iniciar sesión")
    }

    return await res.json()
  } catch (err) {
    console.error(" Error en loginUser:", err)
    throw err
  }
}

export const register = async (name, email, password) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.error || "Error al registrarse")
    }

    return await res.json()
  } catch (err) {
    console.error("❌ Error en register:", err)
    throw err
  }
}

export const logoutUser = async () => {
  try {
    const res = await fetch( `${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.error || "Error al cerrar sesión")
    }

    return await res.json()
  } catch (err) {
    console.error("❌ Error en logoutUser:", err)
    throw err
  }
}

export const checkSession = async () => {
  try {
    const res = await fetch(`${API_URL}/check-session`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) return null 
    return await res.json()
  } catch (err) {
    console.error("❌ Error al verificar sesión:", err)
    return null
  }
}