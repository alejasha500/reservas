import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ReservationProvider } from './context/ReservationContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
         <ReservationProvider>
                 <App />
         </ReservationProvider>
    </AuthProvider>
  </StrictMode>,
)


   