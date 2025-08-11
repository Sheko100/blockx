import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import RegistrationPage from './components/RegistrationPage';
import { AuthProvider } from './components/context/AuthContext.jsx'; // Named import
import { AuthContext } from './components/context/AuthContext';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App