  import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 10000,  
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Timeout
    if (error.code === 'ECONNABORTED') {
      console.error('La petición tardó demasiado')
    }
    
    // No autenticado
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default api