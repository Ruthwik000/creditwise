import { motion } from 'framer-motion'

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card p-6 text-center group hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-blue/30 transition-colors">
        <Icon className="w-6 h-6 text-accent-blue" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default FeatureCard