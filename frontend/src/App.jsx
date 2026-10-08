import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import RegistrationPage from './components/RegistrationPage';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { InternetIdentityProvider } from './components/context/InternetIdentityContext.jsx';
import VerifyProperty from './components/VerifyProperty';
import DashboardPage from './components/DashboardPage.jsx';
import About from './components/About';

import { Toaster } from 'react-hot-toast'

function App() {
  return (
      <>
          <Toaster />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/verify" element={<VerifyProperty />} />
             <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </>
  )
}

export default App
