import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//import AuthContext  from './AuthContext.jsx'

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext)

  if (!user) return <Navigate to="/login" replace />

  return <Outlet /> // Renders child routes
}