import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, DollarSign, Calendar, MapPin } from 'lucide-react'
import Header from '../components/Header'
import ChartCard from '../components/ChartCard'
import { companiesById } from '../lib/sampleData'

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  // Use shared sample data for development

  useEffect(() => {
    // Simulate API call
    const fetchCompanyData = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
  const companyId = Number(id) || 1
  const companyData = companiesById[companyId] || null
  setCompany(companyData)
      setLoading(false)
    }

    fetchCompanyData()
  }, [id])

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'text-emerald-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return <CheckCircle className="w-5 h-5" />
      case 'medium': return <AlertTriangle className="w-5 h-5" />
      case 'high': return <AlertTriangle className="w-5 h-5" />
      default: return <AlertTriangle className="w-5 h-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#111111]">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full"
          />
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#111111]">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Company Not Found</h2>
            <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#111111]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-3xl p-8 mb-8"
        >
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-12 h-12 text-white/60" />
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{company.name}</h1>
              <p className="text-white/60 mb-4">{company.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-white/80">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">{company.industry}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{company.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{company.employees}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Founded {company.founded}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-2">{company.creditScore}</div>
              <div className={`flex items-center space-x-2 ${getRiskColor(company.riskLevel)}`}>
                {getRiskIcon(company.riskLevel)}
                <span className="font-medium">{company.riskLevel} Risk</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {Object.entries(company.financialMetrics).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6"
            >
              <div className="text-white/60 text-sm mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credit Score Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard
              title="Credit Score Trend"
              data={company.creditHistory}
              type="line"
            />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-3xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {company.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-indigo-400" />}
                      {activity.type === 'credit_check' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                      {activity.type === 'application' && <Building2 className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div>
                      <div className="text-white font-medium">{activity.description}</div>
                      <div className="text-white/60 text-sm">{activity.date}</div>
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="text-white font-semibold">{activity.amount}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard