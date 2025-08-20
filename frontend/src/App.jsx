import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import RegistrationPage from './components/RegistrationPage';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { InternetIdentityProvider } from './components/context/InternetIdentityContext.jsx';
import VerifyProperty from './components/VerifyProperty';
import DashboardPage from './components/DashboardPage.jsx';
import { Toaster } from 'react-hot-toast'

/*ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);*/


function App() {
  return (
    <InternetIdentityProvider>
      <AuthProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute children={<DashboardPage />} />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/verify" element={<VerifyProperty />} />
          </Routes>
      </AuthProvider>
    </InternetIdentityProvider>
  )
}

export default App