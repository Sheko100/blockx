import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import WalletButton from '../ui/WalletButton'
import { IconMail, IconBrandInternetComputer, IconPlug } from '@tabler/icons-react'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('wallet')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const { state } = useLocation()
  const navigate = useNavigate()

  const redirectTo = state?.from?.pathname || '/dashboard'

  const handleWalletConnect = async (provider) => {
    setIsLoading(true)
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000))
      login({ 
        principal: "mock-principal", 
        provider,
        address: "0x..." 
      })
      navigate(redirectTo)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      login({ principal: "email-user", provider: "email" })
      navigate(redirectTo)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Connect to Continue
            </h2>
            <p className="text-gray-600">
              {redirectTo.includes('register') 
                ? 'Register your digital property' 
                : 'Verify property ownership'}
            </p>
          </div>

          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex-1 py-2 font-medium text-sm ${
                activeTab === 'wallet' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
              }`}
            >
              Web3 Wallets
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-2 font-medium text-sm ${
                activeTab === 'email' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
              }`}
            >
              Email
            </button>
          </div>

          {activeTab === 'wallet' ? (
            <div className="space-y-4">
              <WalletButton 
                icon={<IconBrandInternetComputer />}
                label="Internet Identity"
                onClick={() => handleWalletConnect('internet-identity')}
                disabled={isLoading}
              />
              <WalletButton 
                icon={<IconPlug />}
                label="Plug Wallet"
                onClick={() => handleWalletConnect('plug')}
                disabled={isLoading}
              />
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}