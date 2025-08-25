import React from 'react';
import { motion } from 'framer-motion';
import { IconShield, IconUsers, IconGlobe, IconRocket } from '@tabler/icons-react';
import Header from './Header';

const About = () => {
  const teamMembers = [
    {
      name: "Shaker Sharaby",
      role: "Full Stack Developer",
      bio: "experience in blockchain technology and smart contract development."
    },
    {
      name: "Abdulrahman Mohamed",
      role: "Product Designer",
      bio: "Specialized in user experience for Web applications and decentralized platforms."
    },
    
  ];

  const values = [
    {
      icon: <IconShield className="w-8 h-8" />,
      title: "Security First",
      description: "We prioritize the security of your digital and physical assets above all else."
    },
    {
      icon: <IconUsers className="w-8 h-8" />,
      title: "User Empowerment",
      description: "We believe in giving users full control over their assets without intermediaries."
    },
    {
      icon: <IconGlobe className="w-8 h-8" />,
      title: "Global Accessibility",
      description: "Our platform is accessible to anyone, anywhere, with internet connection."
    },
    {
      icon: <IconRocket className="w-8 h-8" />,
      title: "Innovation Driven",
      description: "We continuously evolve our technology to stay at the forefront of asset licensing."
    }
  ];

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

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent">
              About Verisys
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionizing how digital and physical assets are licensed, verified, and managed on the blockchain
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                At Verisys, we're building a future where asset ownership is transparent, 
                verifiable, and accessible to everyone. We believe that blockchain technology 
                has the power to transform how we manage and transfer ownership of both digital 
                and physical assets.
              </p>
              <p className="text-lg text-gray-300">
                Our platform provides immutable licensing solutions that eliminate fraud, 
                reduce intermediaries, and create trust between parties in asset transactions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50"
            >
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-gray-700/30 p-6 rounded-xl text-center"
                  >
                    <div className="text-orange-500 mb-4 flex justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experienced professionals passionate about blockchain and asset management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700/50 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-orange-500 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Our Technology
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Blockchain Infrastructure</h3>
                  <p className="text-gray-400">Built on Ethereum with plans to expand to other chains</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
                  <p className="text-gray-400">Audited, secure contracts for asset licensing and verification</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">IPFS Storage</h3>
                  <p className="text-gray-400">Decentralized storage for asset metadata and documents</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Proven Security</h3>
                  <p className="text-gray-400">Multiple security audits and bug bounty programs</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">User-Friendly</h3>
                  <p className="text-gray-400">Intuitive interface designed for both beginners and experts</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Future-Proof</h3>
                  <p className="text-gray-400">Designed to evolve with blockchain technology advancements</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-md p-12 rounded-2xl border border-gray-700/50"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already securing their digital and physical assets on our platform
            </p>
            <motion.button 
              onClick={() => window.location.href = '/register'}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-medium"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Licensing Assets Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;