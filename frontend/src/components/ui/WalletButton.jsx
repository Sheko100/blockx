import { motion } from 'framer-motion'

export default function WalletButton({ icon, label, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className="mr-3">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </motion.button>
  )
}