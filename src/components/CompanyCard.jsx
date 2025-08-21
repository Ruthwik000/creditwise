import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const CompanyCard = ({ company, onClick }) => {
  const getScoreColor = (score) => {
    if (score >= 700) return 'score-green'
    if (score >= 600) return 'score-yellow'
    return 'score-red'
  }

  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4" />
    if (trend < 0) return <TrendingDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card-hover p-6 cursor-pointer group relative overflow-hidden"
      onClick={() => onClick(company.id)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Company Logo */}
      <div className="relative flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-white font-bold text-2xl">
            {company.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Company Name */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white group-hover:text-accent-blue-light transition-colors duration-300 mb-2">
          {company.name}
        </h3>
        
        {/* Industry */}
        <p className="text-sm text-gray-400 font-medium">
          {company.sector}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  )
}

export default CompanyCard