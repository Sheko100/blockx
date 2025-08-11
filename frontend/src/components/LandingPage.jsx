/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import { TablerIcon, IconFileUpload, IconShieldLock, IconCertificate, IconArrowRight } from '@tabler/icons-react';
import { IconFileUpload, IconTopologyStarRing3, IconShieldLock, IconCertificate, IconArrowRight } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ connectWallet }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <IconShieldLock className="w-10 h-10 text-blue-500" />,
      title: "Immutable Registration",
      description: "Once registered, your digital property record cannot be altered or deleted."
    },
    {
      icon: <IconFileUpload className="w-10 h-10 text-orange-500" />,
      title: "Instant Verification",
      description: "Anyone can instantly verify the authenticity of your licensed properties."
    },
	  {
	    icon: <IconTopologyStarRing3 className="w-10 h-10 text-blue-500" />,
      title: "Decentralized Management",
      description: "You maintain full ownership and control with no central authority."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">PropLicense</span>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {['Features', 'How It Works', 'About'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-500 relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute left-0 bottom-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>
          
          <motion.button 
            onClick={connectWallet}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Connect Wallet</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section with Floating Animation */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              License Your <span className="text-blue-500">Digital Properties</span> Securely
            </h1>

            
            <button 
              onClick={() => navigate('/register')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Register New Property
            </button>
            <p className="text-xl text-gray-600 mb-8">
              Register, verify, and manage
              your digital assets with immutable
              Web3 technology.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">


              {/* <motion.button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium relative overflow-hidden group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  Register New Property 
                  
                  <IconArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button> */}

              
              <motion.button 
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium group"
                whileHover={{ y: -3 }}
              >
                <span className="flex items-center">
                  Verify Existing
                  <IconArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                </span>
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 rounded-full opacity-70"
              ></motion.div>
              
              <motion.div 
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full opacity-70"
              ></motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-sm text-gray-500">Digital License Certificate</div>
                </div>
                <div className="h-48 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg mb-4 flex items-center justify-center">
                  <IconCertificate className="w-16 h-16 text-blue-500" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="h-2 bg-gray-200 rounded-full"
                    ></motion.div>
                  ))}
                </div>
                <div className="text-xs font-mono text-gray-500 overflow-hidden overflow-ellipsis">
                  0x7f5e...d3a4
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Key Features
          </motion.h2>
          
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-4"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {features[currentFeature].icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{features[currentFeature].title}</h3>
                <p className="text-gray-600">{features[currentFeature].description}</p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center space-x-2 mt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-3 h-3 rounded-full ${currentFeature === index ? 'bg-orange-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with Staggered Animation */}
      <section id="how-it-works" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            How It Works
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Connect Your Wallet",
                description: "Link your Internet Identity, Plug, Stoic, or other Web3 wallet to get started."
              },
              {
                step: "2",
                title: "Register Your Property",
                description: "Upload your digital file or enter details to generate a unique blockchain record."
              },
              {
                step: "3",
                title: "Share Verifiable Licenses",
                description: "Provide the hash to anyone who needs to verify your digital property license."
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
                  className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 cursor-pointer"
                >
                  {item.step}
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-white p-4 rounded-lg shadow-sm flex-grow"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Secure Your Digital Properties?
          </motion.h2>
          
          <motion.button 
            onClick={connectWallet}
            className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Connect Wallet & Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
          
          <motion.div 
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mt-6 flex justify-center"
          >
            <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer with Wave Animation */}
      <footer className="bg-gray-800 text-white pt-12 relative overflow-hidden">
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
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* ... rest of footer content same as before ... */}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
