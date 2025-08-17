import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IconSearch, 
  IconShieldCheck, 
  IconFileCertificate, 
  IconArrowRight,
  IconInfoCircle,
  IconX
} from '@tabler/icons-react';

const VerifyProperty = () => {
  const navigate = useNavigate();
  const [propertyHash, setPropertyHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        valid: true,
        title: "Digital Art Collection",
        owner: "0x8921...f3a7",
        registered: "2023-06-15",
        type: "NFT",
        blockchain: "Ethereum"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-orange-900 text-white">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(249, 115, 22, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Glass Morphic Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            >
              P
            </motion.div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">PropLicense</span>
          </motion.div>
          <motion.button 
            onClick={() => navigate('/register')}
            className="text-blue-400 hover:text-blue-300 font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Register Property
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow flex items-center justify-center py-12 px-4 relative z-10"
      >
        <div className="w-full max-w-3xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Verify Property Ownership
            </h1>
            <p className="text-xl text-gray-300">
              Check the authenticity and ownership of any registered property
            </p>
          </motion.div>

          {/* Verification Form */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10 relative"
          >
            {/* Decorative elements */}
            <motion.div 
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
            />
            
            <div className="p-8">
              <form onSubmit={handleVerify}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Property Hash or ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={propertyHash}
                      onChange={(e) => setPropertyHash(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                      placeholder="0x4a3b...8c2d"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 15px -5px rgba(37, 99, 235, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isVerifying ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="inline-block mr-2"
                        >
                          <IconInfoCircle className="w-5 h-5" />
                        </motion.span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Ownership
                        <IconArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Verification Results */}
          <AnimatePresence>
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10"
              >
                <div className="p-6 border-b border-white/10 bg-blue-500/20">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <IconShieldCheck className="text-blue-400 mr-2" />
                    Verification Results
                  </h3>
                </div>

                <div className="p-6">
                  <div className={`mb-4 p-4 rounded-lg ${verificationResult.valid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <div className="flex items-center">
                      <IconShieldCheck className="mr-2" />
                      <span className="font-medium">
                        {verificationResult.valid 
                          ? 'Valid Ownership Record Found' 
                          : 'No Valid Ownership Record'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Property Title</p>
                      <p className="font-medium text-white">{verificationResult.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Owner</p>
                      <p className="font-medium text-white">{verificationResult.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Registration Date</p>
                      <p className="font-medium text-white">{verificationResult.registered}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Asset Type</p>
                      <p className="font-medium text-white">{verificationResult.type}</p>
                    </div>
                  </div>

                  {verificationResult.valid && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        <IconFileCertificate className="mr-2" />
                        View Certificate
                      </span>
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-md py-6 border-t border-white/10 text-center text-sm text-gray-400 relative z-10"
      >
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} PropLicense. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default VerifyProperty;