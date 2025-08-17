import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import LoginPage from './components/auth/LoginPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import DashboardLayout from './components/dashboard/DashboardLayout'
import RegisterProperty from './components/dashboard/RegisterProperty'
import VerifyProperty from './components/dashboard/VerifyProperty'
import NotFound from './pages/NotFound'
import RegistrationPage from './components/RegistrationPage';
import DashboardPage from './components/DashboardPage';




export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="register" element={<RegisterProperty />} />
          <Route path="/Verify Existing" element={<VerifyProperty />} />
          <Route index element={<DashboardPage />} />
          {/* Add other dashboard routes here */}
          {/* Example: <Route path="settings" element={<Settings />} /> */}
          <Route path="/verify" element={<VerifyProperty />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}