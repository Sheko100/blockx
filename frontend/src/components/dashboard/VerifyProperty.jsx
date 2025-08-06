import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VerifyProperty() {
  const [hash, setHash] = useState('')

  const handleVerify = () => {
    // Verification logic here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-bold mb-4">Verify Property</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Hash</label>
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="0x..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleVerify}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
      >
        Verify Ownership
      </button>
    </motion.div>
  )
}