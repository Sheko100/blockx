import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleAction = (action) => {
    navigate('/login', { state: { redirectTo: `/dashboard/${action}` } })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">PropLicense</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Connect Wallet
          </button>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            License Your Digital Properties Securely
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button
              onClick={() => handleAction('register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center"
            >
              Register New Property
              <IconArrowRight className="ml-2" />
            </motion.button>
            
            <motion.button
              onClick={() => handleAction('verify')}
              whileHover={{ scale: 1.05 }}
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center"
            >
              Verify Existing
              <IconArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}