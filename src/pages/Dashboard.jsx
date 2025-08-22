import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Filter, SortAsc, SortDesc, X } from 'lucide-react'
import Header from '../components/Header'
import CompanyCard from '../components/CompanyCard'
import { companies as sampleCompanies } from '../lib/sampleData'

const Dashboard = () => {
  const navigate = useNavigate()
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [showFilters, setShowFilters] = useState(false)
  
  // Companies data - replace with real API calls
  const [companies] = useState(sampleCompanies)

  // Get unique sectors for filter dropdown
  const sectors = useMemo(() => {
    return [...new Set(companies.map(company => company.sector))]
  }, [companies])

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSector = !selectedSector || company.sector === selectedSector
      return matchesSearch && matchesSector
    })

    // Sort companies
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'sector':
          aValue = a.sector.toLowerCase()
          bValue = b.sector.toLowerCase()
          break
        case 'creditScore':
          aValue = a.creditScore
          bValue = b.creditScore
          break
        case 'lastUpdate':
          // Convert relative time to sortable format (simplified)
          aValue = a.lastUpdate.includes('hour') ? 1 : a.lastUpdate.includes('min') ? 0.5 : 2
          bValue = b.lastUpdate.includes('hour') ? 1 : b.lastUpdate.includes('min') ? 0.5 : 2
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [companies, searchTerm, selectedSector, sortBy, sortOrder])

  const handleCompanyClick = (companyId) => {
    navigate(`/companydashboard/${companyId}`)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSector('')
    setSortBy('name')
    setSortOrder('asc')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#111318] to-[#1a1d24] relative">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-500/8 to-transparent rounded-full blur-3xl"
        ></motion.div>
      </div>

      <Header 
        variant="dashboard" 
        showSearch={true} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Credit Intelligence Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400"
          >
            Monitor real-time credit scores and market events across your portfolio
          </motion.p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/[0.05] border border-white/[0.1] rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:shadow-glow-sm transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-3xl"></div>
            <div className="relative">
              <div className="text-3xl font-bold text-white mb-2">50</div>
              <div className="text-sm text-gray-400 mb-2">Companies Tracked</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-400">All systems active</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/[0.05] border border-white/[0.1] rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:shadow-glow-sm transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-3xl"></div>
            <div className="relative">
              <div className="text-3xl font-bold text-emerald-400 mb-2">18</div>
              <div className="text-sm text-gray-400 mb-2">Stable Ratings</div>
              <div className="text-xs text-emerald-400">↗ +2 this week</div>
            </div>
          </div>
          
          <div className="bg-white/[0.05] border border-white/[0.1] rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:shadow-glow-sm transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-3xl"></div>
            <div className="relative">
              <div className="text-3xl font-bold text-amber-400 mb-2">4</div>
              <div className="text-sm text-gray-400 mb-2">Under Watch</div>
              <div className="text-xs text-amber-400">→ No change</div>
            </div>
          </div>
          
          <div className="bg-white/[0.05] border border-white/[0.1] rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:shadow-glow-sm transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-3xl"></div>
            <div className="relative">
              <div className="text-3xl font-bold text-red-400 mb-2">2</div>
              <div className="text-sm text-gray-400 mb-2">High Risk</div>
              <div className="text-xs text-red-400">↘ -1 this week</div>
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center space-x-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl font-semibold text-white"
              >
                Portfolio Companies
              </motion.h2>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="text-sm text-gray-400 bg-white/[0.05] px-3 py-1 rounded-full"
              >
                ({filteredAndSortedCompanies.length} of {companies.length})
              </motion.span>
            </div>
            <div className="flex items-center space-x-3">
              {(searchTerm || selectedSector || sortBy !== 'name') && (
                <button
                  onClick={clearFilters}
                  className="text-white/60 hover:text-white hover:bg-white/[0.05] px-4 py-2 rounded-xl transition-all duration-200 text-sm flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm text-sm flex items-center space-x-2 ${showFilters ? 'bg-indigo-500/20 border-indigo-500/30' : ''}`}
              >
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Filter className="w-4 h-4" />
                </motion.div>
                <span>Filter</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/[0.05] border border-white/[0.1] rounded-xl p-6 mb-6 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Sector Filter */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Sector
                  </label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full bg-dark-card/80 border border-dark-border/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  >
                    <option value="" className="bg-dark-card text-white">All Sectors</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector} className="bg-dark-card text-white">{sector}</option>
                    ))}
                  </select>
                </motion.div>

                {/* Sort By */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-dark-card/80 border border-dark-border/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  >
                    <option value="name" className="bg-dark-card text-white">Company Name</option>
                    <option value="sector" className="bg-dark-card text-white">Sector</option>
                    <option value="creditScore" className="bg-dark-card text-white">Credit Score</option>
                    <option value="lastUpdate" className="bg-dark-card text-white">Last Updated</option>
                  </select>
                </motion.div>

                {/* Sort Order */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Order
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="w-full bg-dark-card/80 hover:bg-dark-elevated/80 border border-dark-border/50 hover:border-indigo-500/30 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <motion.div
                      animate={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SortAsc className="w-4 h-4" />
                    </motion.div>
                    <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {filteredAndSortedCompanies.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredAndSortedCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CompanyCard
                    company={company}
                    onClick={handleCompanyClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No companies found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button onClick={clearFilters} className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25">
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard