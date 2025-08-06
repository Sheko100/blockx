import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <nav className="flex space-x-6">
            <Link to="/dashboard/register" className="font-medium text-gray-700 hover:text-blue-500">
              Register
            </Link>
            <Link to="/dashboard/verify" className="font-medium text-gray-700 hover:text-blue-500">
              Verify
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.principal?.slice(0, 12)}...
            </span>
            <button 
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}