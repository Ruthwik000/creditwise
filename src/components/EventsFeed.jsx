import { motion } from 'framer-motion'
import { Calendar, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

const EventsFeed = ({ events, className = '' }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-accent-green" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-accent-red" />
      case 'neutral':
        return <AlertTriangle className="w-4 h-4 text-accent-yellow" />
      default:
        return <Calendar className="w-4 h-4 text-gray-400" />
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'border-l-accent-green'
      case 'negative':
        return 'border-l-accent-red'
      case 'neutral':
        return 'border-l-accent-yellow'
      default:
        return 'border-l-gray-500'
    }
  }

  return (
    <div className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border-l-4 ${getSentimentColor(event.sentiment)} pl-4 py-2`}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {getSentimentIcon(event.sentiment)}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white mb-1">
                  {event.title}
                </h4>
                <p className="text-xs text-gray-400 mb-2">
                  {event.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {event.timestamp}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.impact === 'high' ? 'bg-accent-red/20 text-accent-red' :
                    event.impact === 'medium' ? 'bg-accent-yellow/20 text-accent-yellow' :
                    'bg-accent-green/20 text-accent-green'
                  }`}>
                    {event.impact} impact
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EventsFeed