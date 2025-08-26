/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IconFileUpload, IconTopologyStarRing3, IconShieldLock, IconCertificate, IconArrowRight, IconBrandTwitter, IconBrandDiscord, IconBrandTelegram, IconBrandMedium, IconX, IconMessage, IconSend, IconArrowBack } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ connectWallet }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHoveringCert, setIsHoveringCert] = useState(false);
  const [currentAssetType, setCurrentAssetType] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [showInitialSuggestions, setShowInitialSuggestions] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 5000);
    
    const assetTypeInterval = setInterval(() => {
      setCurrentAssetType((prev) => (prev + 1) % 2);
    }, 3000);
    
    // Show chatbot popup after 2 seconds
    const chatbotTimer = setTimeout(() => {
      setShowChatbot(true);
    }, 2000);
    
    return () => {
      clearInterval(featureInterval);
      clearInterval(assetTypeInterval);
      clearTimeout(chatbotTimer);
    };
  }, []);

  const features = [
    {
      icon: <IconShieldLock className="w-10 h-10 text-blue-500" />,
      title: "Immutable Registration",
      description: "Once registered, your digital asset record cannot be altered or deleted."
    },
    {
      icon: <IconFileUpload className="w-10 h-10 text-orange-500" />,
      title: "Instant Verification",
      description: "Anyone can instantly verify the authenticity of your licensed assets."
    },
    {
      icon: <IconTopologyStarRing3 className="w-10 h-10 text-blue-500" />,
      title: "Decentralized Management",
      description: "You maintain full ownership and control with no central authority."
    }
  ];

  const assetTypes = ["Digital", "Physical"];

  // Suggested responses for the chatbot
  const initialSuggestedResponses = [
    "How do I register an asset?",
    "What types of assets can I license?",
    "How does verification work?",
    "What blockchain do you use?",
    "Is there a fee for registration?",
    "How secure is this platform?"
  ];

  const followUpSuggestedResponses = [
    "Tell me more about digital assets",
    "What about physical assets?",
    "How long does verification take?",
    "Can I transfer my license?",
    "What wallets are supported?",
    "Go back to main questions"
  ];

  // Handle sending a message
  const handleSendMessage = (message) => {
    const newMessage = { text: message, sender: 'user' };
    setChatMessages([...chatMessages, newMessage]);
    setShowInitialSuggestions(false);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let response = "";
      let followUp = false;
      
      if (message.includes("register")) {
        response = "To register an asset, click on the 'Register New Asset' button and follow the steps to upload your asset details to the blockchain. You'll need to provide details about your asset and pay a small gas fee for the transaction.";
        followUp = true;
      } else if (message.includes("type") || message.includes("kind")) {
        response = "You can license both digital assets (NFTs, digital art, documents, software) and physical assets (real estate, collectibles, luxury goods, intellectual property). Each type has specific verification processes.";
        followUp = true;
      } else if (message.includes("verification") || message.includes("verify")) {
        response = "Verification is done through our blockchain-based system. Each asset receives a unique hash that is stored on the blockchain. Anyone can verify an asset's authenticity using the verification page by entering the asset's hash or scanning its QR code.";
        followUp = true;
      } else if (message.includes("blockchain") || message.includes("network")) {
        response = "We use a multi-chain approach with Ethereum, Internet Computer, Polygon, and other compatible blockchains for maximum flexibility and security. This ensures low fees and fast transactions regardless of network congestion.";
        followUp = true;
      } else if (message.includes("fee") || message.includes("cost") || message.includes("price")) {
        response = "There's a small gas fee for blockchain transactions, which varies based on network congestion. We don't charge additional platform fees for basic registration and verification. Premium features may have associated costs.";
        followUp = true;
      } else if (message.includes("secure") || message.includes("security") || message.includes("safe")) {
        response = "Our platform uses military-grade encryption and blockchain technology to ensure maximum security. Your assets are stored on decentralized networks, making them tamper-proof and immutable. We never store your private keys.";
        followUp = true;
      } else if (message.includes("digital asset")) {
        response = "Digital assets include NFTs, digital art, documents, certificates, software licenses, and any other digital content. Each receives a unique blockchain hash that serves as proof of ownership and authenticity.";
        followUp = true;
      } else if (message.includes("physical asset")) {
        response = "Physical assets like real estate, collectibles, luxury goods, and equipment can be registered by uploading documentation and photos. Each physical asset receives a unique QR code that can be scanned for verification.";
        followUp = true;
      } else if (message.includes("transfer") || message.includes("sell")) {
        response = "Yes, you can transfer licenses to other users. This generates a new transaction on the blockchain, updating ownership records. There may be gas fees associated with transfer operations.";
        followUp = true;
      } else if (message.includes("wallet")) {
        response = "We support all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and more. For Internet Computer, we support Plug, Stoic, and Internet Identity.";
        followUp = true;
      } else if (message.includes("back") || message.includes("main")) {
        response = "Sure! What would you like to know about our platform?";
        setShowInitialSuggestions(true);
      } else {
        response = "I'm here to help with any questions about asset licensing and verification. How can I assist you today?";
        followUp = true;
      }
      
      setChatMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      
      // Show follow-up questions if appropriate
      if (followUp && !message.includes("back")) {
        setTimeout(() => {
          setChatMessages(prev => [...prev, { 
            text: "Is there anything else you'd like to know?", 
            sender: 'bot',
            isPrompt: true 
          }]);
        }, 500);
      }
    }, 1000);
  };

  const handleGoBackToSuggestions = () => {
    setChatMessages([]);
    setShowInitialSuggestions(true);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-0"
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-orange-900"
        />
        
        {/* Animated noise texture */}
        <motion.div 
          animate={{
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
        />
        
        {/* Floating gradient blobs */}
        <motion.div
          animate={{
            x: ['-20%', '20%'],
            y: ['-10%', '10%'],
            scale: [1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-800/20 to-transparent rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: ['20%', '-20%'],
            y: ['20%', '-20%'],
            scale: [1, 1.3],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-800/20 to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      <Header />

      {/* Chatbot Popup */}
      <AnimatePresence>
        {showChatbot && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed bottom-6 right-6 z-50 cursor-pointer"
            onClick={() => setIsChatOpen(true)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-orange-600 p-4 rounded-full shadow-2xl flex items-center justify-center"
            >
              <IconMessage className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Pulsing effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] z-50 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/30 overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-600/90 to-orange-600/90 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="font-semibold">Verisys Assistant</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsChatOpen(false);
                  setShowChatbot(false);
                }}
                className="text-white/80 hover:text-white"
              >
                <IconX className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconMessage className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-gray-300">Hello! I'm your Verisys assistant. How can I help you today?</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-600/90 text-white'
                            : 'bg-gray-700/50 text-gray-200'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Suggested responses */}
            <div className="px-4 pb-3">
              {showInitialSuggestions && chatMessages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {initialSuggestedResponses.map((response, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(response)}
                        className="text-xs bg-gray-700/40 hover:bg-gray-700/70 text-gray-300 p-2 rounded-lg text-left transition-colors"
                      >
                        {response}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {!showInitialSuggestions && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-400">More questions:</p>
                    <motion.button
                      onClick={handleGoBackToSuggestions}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs text-blue-400 flex items-center"
                    >
                      <IconArrowBack size={14} className="mr-1" />
                      Back to main
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {followUpSuggestedResponses.map((response, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(response)}
                        className="text-xs bg-gray-700/40 hover:bg-gray-700/70 text-gray-300 p-2 rounded-lg text-left transition-colors"
                      >
                        {response}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the landing page code remains exactly the same */}
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{paddingTop: "30px"}}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-16 md:mb-0"
          >
           <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="text-5xl md:text-6xl font-bold mb-6"
>
  <div className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent">
    <div className="flex flex-col">
      <div className="flex items-baseline justify-start">
        <span className="mr-2">License Your</span>
        <div className="relative w-36 h-16 overflow-visible">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentAssetType}
              initial={{ rotateX: 90, opacity: 0, y: 5 }}
              animate={{ rotateX: 0, opacity: 1, y: 2 }}
              exit={{ rotateX: -90, opacity: 0, y: -5 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center ml-20 mt-5"
              style={{ 
                color: '#F97316' // Orange color (Tailwind's orange-500)
              }}
            >
              {assetTypes[currentAssetType]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="mt-2">Assets on</span>
      <span style={{ color: '#F97316'}} >Internet Computer</span>
    </div>
  </div>
</motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8"
            >
              The decentralized solution for authenticating and managing your assets on the blockchain.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button 
                onClick={() => navigate('/register')}
                className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-medium overflow-hidden group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  Register New Asset
                  <IconArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {/* Pulse animation */}
                <motion.span
                  className="absolute inset-0 rounded-xl border-2 border-orange-400 opacity-0"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </motion.button>
              
              <motion.button 
                onClick={() => navigate('/verify')}
                className="relative border-2 border-blue-400 text-blue-400 hover:bg-blue-900/30 px-8 py-4 rounded-xl font-medium group overflow-hidden"
                whileHover={{ y: -3 }}
              >
                <span className="relative z-10 flex items-center">
                  Verify Existing
                  <IconArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                </span>
                {/* Glow effect on hover */}
                <motion.span
                  className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity"
                />
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            {/* Animated Certificate */}
            <motion.div 
              className="relative w-full max-w-md"
              onHoverStart={() => setIsHoveringCert(true)}
              onHoverEnd={() => setIsHoveringCert(false)}
            >
              {/* Floating background elements */}
              <motion.div 
                animate={{
                  y: [0, -15, 0],
                  x: [0, -10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-lg"
              />
              
              <motion.div 
                animate={{
                  y: [0, 15, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-lg"
              />
              
              {/* Certificate Card */}
              <motion.div 
                animate={{
                  rotate: isHoveringCert ? [0, -1, 1, 0] : 0,
                  y: isHoveringCert ? [0, -10, 0] : 0
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
              >
                {/* Certificate shine effect */}
                <motion.div 
                  animate={{
                    x: ['-100%', '150%'],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
                
                {/* Certificate header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <div className="text-sm text-gray-400">Asset License Certificate</div>
                  </div>
                  <div className="text-xs text-gray-500">Blockchain Verified</div>
                </div>
                
                {/* Certificate content */}
                <div className="relative">
                  {/* Watermark */}
                  <motion.div 
                    animate={{
                      opacity: [0.03, 0.05, 0.03],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <IconCertificate className="w-40 h-40 text-white/10" />
                  </motion.div>
                  
                  {/* Certificate body */}
                  <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/30">
                    <div className="flex justify-center mb-6">
                      <IconCertificate className="w-16 h-16 text-blue-400" />
                    </div>
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-2">
                        ASSET LICENSE
                      </h3>
                      <p className="text-gray-400 text-sm">Certificate of Authenticity</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-gray-500 text-xs">Asset ID</p>
                        <p className="text-gray-300 font-mono">0x7f5e...d3a4</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Issued On</p>
                        <p className="text-gray-300">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Network</p>
                        <p className="text-gray-300">Ethereum</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Status</p>
                        <p className="text-green-400">Verified</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated verification bars */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scaleY: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="h-2 bg-gradient-to-r from-blue-500/50 to-orange-500/50 rounded-full"
                      />
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-mono">
                      Blockchain Hash: 0x7f5e1a3b...9c4d3a4f
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Revolutionizing asset management with blockchain technology
            </p>
          </motion.div>
          
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Feature card shine */}
                <motion.div 
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
                
                {/* Background glow */}
                <motion.div 
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className={`absolute -inset-2 rounded-2xl ${
                    index % 3 === 0 ? 'bg-blue-500/10' : 
                    index % 3 === 1 ? 'bg-orange-500/10' : 'bg-blue-500/10'
                  } blur-md`}
                />
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile carousel */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700/50 mb-6 relative overflow-hidden"
              >
                {/* Mobile card glow */}
                <motion.div 
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity
                  }}
                  className={`absolute -inset-2 rounded-2xl ${
                    currentFeature % 3 === 0 ? 'bg-blue-500/10' : 
                    currentFeature % 3 === 1 ? 'bg-orange-500/10' : 'bg-blue-500/10'
                  } blur-md`}
                />
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                  {features[currentFeature].icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 relative z-10">{features[currentFeature].title}</h3>
                <p className="text-gray-400 relative z-10">{features[currentFeature].description}</p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center space-x-3 mt-6">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full ${currentFeature === index ? 'bg-orange-500' : 'bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple steps to secure your assets
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Connect Your Wallet",
                description: "Link your Internet Identity, Plug, Stoic, or other Web3 wallet to get started."
              },
              {
                step: "2",
                title: "Register Your Asset",
                description: "Upload your digital file or enter details to generate a unique blockchain record."
              },
              {
                step: "3",
                title: "Share Verifiable Licenses",
                description: "Provide the hash to anyone who needs to verify your asset license."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex mb-8 last:mb-0 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 cursor-pointer relative overflow-hidden"
                >
                  <motion.span 
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 to-orange-600 rounded-full"
                  />
                  <span className="relative z-10">{item.step}</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50 flex-grow"
                >
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-32 overflow-hidden"
      >
        <motion.div 
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-orange-900"
        />
        
        <motion.div 
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            animate={{
              scale: [1, 1.02, 1],
              textShadow: ["0 0 0 rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.2)", "0 0 0 rgba(255,255,255,0)"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="text-4xl font-bold mb-8"
          >
            Ready to Secure Your Assets?
          </motion.h2>
          
          <motion.div className="flex justify-center">
            <motion.button 
              onClick={() => navigate('/register')}
              className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-xl font-medium text-lg overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <IconArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              {/* Button pulse */}
              <motion.span
                className="absolute inset-0 rounded-xl border-2 border-orange-400 opacity-0"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1
                }}
              />
              {/* Button shine */}
              <motion.span
                className="absolute top-0 left-0 w-1/2 h-full bg-white/30 skew-x-[-20deg]"
                initial={{ x: '-150%' }}
                animate={{
                  x: ['-150%', '150%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.button>
          </motion.div>
          
          {/*<motion.div 
            animate={{
              opacity: [0.6, 1, 0.6],
              y: [0, 5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mt-10 flex justify-center"
          >
            <div className="w-10 h-10  border-2 border-white border-t-transparent animate-spin"></div>
          </motion.div>*/}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-md text-white pt-20 pb-10 relative overflow-hidden border-t border-gray-800">
        <motion.div 
          animate={{
            x: ['-50%', '0%', '-50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center cursor-pointer mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Verisys</span>
              </motion.div>
              <p className="text-gray-400">Secure asset licensing on the blockchain.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Navigation</h4>
              <ul className="space-y-3">
                
                {['Features', 'How It Works', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <motion.a 
                      whileHover={{ x: 5 }}
                      href={`#${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <IconArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'Whitepaper', 'GitHub', 'Blog'].map((item) => (
                  <li key={item}>
                    <motion.a 
                      whileHover={{ x: 5 }}
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <IconArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Connect</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <IconBrandTwitter className="w-6 h-6" />, name: 'Twitter' },
                  { icon: <IconBrandDiscord className="w-6 h-6" />, name: 'Discord' },
                  { icon: <IconBrandTelegram className="w-6 h-6" />, name: 'Telegram' },
                  { icon: <IconBrandMedium className="w-6 h-6" />, name: 'Medium' }
                ].map((item) => (
                  <motion.a 
                    key={item.name}
                    whileHover={{ y: -3, color: '#3B82F6' }}
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    title={item.name}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Verisys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;