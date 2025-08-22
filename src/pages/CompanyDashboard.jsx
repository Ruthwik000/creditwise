import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, DollarSign, Calendar, MapPin } from 'lucide-react'
import Header from '../components/Header'
import ChartCard from '../components/ChartCard'
import { companiesById } from '../lib/sampleData'
import { isInWatchlist, toggleWatchlist } from '../lib/watchlist'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiData, setApiData] = useState(null)
  const { id } = useParams()
  const [inWatchlist, setInWatchlist] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const dashboardRef = useRef(null)
  const chartContainerRef = useRef(null)
  const [chartWidth, setChartWidth] = useState(500)

  useEffect(() => {
    const chartContainer = chartContainerRef.current
    if (!chartContainer) return

    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const width = entries[0].contentRect.width
        setChartWidth(width)
      }
    })

    resizeObserver.observe(chartContainer)

    return () => resizeObserver.disconnect()
  }, [])

  const handleToggleWatchlist = () => {
    toggleWatchlist(id)
    setInWatchlist((prev) => !prev)
  }

  const handleExportPdf = () => {
    if (!dashboardRef.current || !company) return

    setIsExporting(true)

    const dashboardElement = dashboardRef.current
    const actionsElement = dashboardElement.querySelector('#dashboard-actions')
    const backButtonElement = dashboardElement.querySelector('#back-button')

    // Hide buttons before capture
    if (actionsElement) actionsElement.style.visibility = 'hidden'
    if (backButtonElement) backButtonElement.style.visibility = 'hidden'

    html2canvas(dashboardElement, {
      backgroundColor: '#030303',
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`creditwise-dashboard-${company.name.toLowerCase().replace(/ /g, '-')}.pdf`)

      // Show buttons again
      if (actionsElement) actionsElement.style.visibility = 'visible'
      if (backButtonElement) backButtonElement.style.visibility = 'visible'

      setIsExporting(false)
    }).catch(err => {
      console.error("Error exporting PDF:", err)
      // Ensure buttons are visible even if there is an error
      if (actionsElement) actionsElement.style.visibility = 'visible'
      if (backButtonElement) backButtonElement.style.visibility = 'visible'
      setIsExporting(false)
    })
  }

  // Credit score to rating mapping (based on common credit rating scales)
  const scoreToRating = (score) => {
    if (score >= 0.9) return { rating: 'AAA', risk: 'Low' }
    if (score >= 0.8) return { rating: 'AA', risk: 'Low' }
    if (score >= 0.7) return { rating: 'A', risk: 'Low' }
    if (score >= 0.6) return { rating: 'BBB', risk: 'Medium' }
    if (score >= 0.5) return { rating: 'BB', risk: 'Medium' }
    if (score >= 0.4) return { rating: 'B', risk: 'High' }
    if (score >= 0.3) return { rating: 'CCC', risk: 'High' }
    if (score >= 0.2) return { rating: 'CC', risk: 'High' }
    return { rating: 'C', risk: 'High' }
  }

  // Format large numbers to millions/billions
  const formatLargeNumber = (num) => {
    if (!num || num === 0) return '0'
    
    const absNum = Math.abs(num)
    const sign = num < 0 ? '-' : ''
    
    if (absNum >= 1e12) {
      return `${sign}$${(absNum / 1e12).toFixed(1)}T`
    } else if (absNum >= 1e9) {
      return `${sign}$${(absNum / 1e9).toFixed(1)}B`
    } else if (absNum >= 1e6) {
      return `${sign}$${(absNum / 1e6).toFixed(1)}M`
    } else if (absNum >= 1e3) {
      return `${sign}$${(absNum / 1e3).toFixed(1)}K`
    } else {
      return `${sign}$${absNum.toFixed(0)}`
    }
  }

  // Format percentage with proper sign
  const formatPercentage = (num) => {
    if (num === null || num === undefined) return 'N/A'
    const sign = num >= 0 ? '+' : ''
    return `${sign}${num.toFixed(1)}%`
  }

  // Format debt to equity ratio
  const formatDebtToEquity = (ratio) => {
    if (ratio === null || ratio === undefined) return 'N/A'
    return ratio.toFixed(2)
  }

  // Format volatility
  const formatVolatility = (vol) => {
    if (vol === null || vol === undefined) return 'N/A'
    if (vol <= 1) return 'Low'
    if (vol <= 3) return 'Medium'
    return 'High'
  }

  // Format news sentiment
  const formatNewsSentiment = (sentiment) => {
    if (sentiment === null || sentiment === undefined) return 'N/A'
    
    let label, percentage
    if (sentiment >= 0.6) {
      label = 'Positive'
    } else if (sentiment >= 0.4) {
      label = 'Neutral'
    } else if (sentiment >= 0.2) {
      label = 'Mixed'
    } else {
      label = 'Negative'
    }
    
    percentage = Math.round(sentiment * 100)
    return `${label} (${percentage}%)`
  }

  // Generate historical credit data (6 days + current day)
  const generateCreditHistory = (currentScore) => {
    const history = []
    const today = new Date()
    
    // Generate 6 previous days with some realistic variation
    for (let i = 6; i >= 1; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      
      // Create variation around current score (±50 points)
      const variation = (Math.random() - 0.5) * 100 // -50 to +50
      const historicalScore = Math.max(300, Math.min(850, currentScore + variation))
      
      history.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: Math.round(historicalScore),
        fullDate: date.toISOString().split('T')[0]
      })
    }
    
    // Add current day data
    history.push({
      date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: currentScore,
      fullDate: today.toISOString().split('T')[0]
    })
    
    return history
  }

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true)
      setInWatchlist(isInWatchlist(id)) // Set watchlist status
      try {
        const companyId = Number(id) || 1
        const companyData = companiesById[companyId] || null
        
        if (!companyData) {
          setCompany(null)
          setLoading(false)
          return
        }

        const { name, ticker } = companyData
        const encodedName = encodeURIComponent(name)
        
        const response = await fetch(`https://credit-wise.onrender.com/predict/${encodedName}/${ticker}`)
        const result = await response.json()
        
        console.log('API Response:', result)
        setApiData(result)

        const currentScore = Math.round(result.prediction * 1000)
        const creditHistory = generateCreditHistory(currentScore)

        // Update company data with API results
        const updatedCompany = {
          ...companyData,
          creditScore: currentScore,
          riskLevel: scoreToRating(result.prediction).risk,
          creditRating: scoreToRating(result.prediction).rating,
          creditHistory: creditHistory, // Add generated history
          financialMetrics: {
            ...companyData.financialMetrics,
            debtToEquity: formatDebtToEquity(result.details['Debt/Equity']),
            revenueGrowthPct: formatPercentage(result.details['Revenue Growth %']),
            netIncome: formatLargeNumber(result.details['Net Income']),
            volatility: formatVolatility(result.details['Volatility']),
            newsSentiment: {
              label: formatNewsSentiment(result.details['News Sentiment']),
              score: result.details['News Sentiment']
            }
          },
          explanation: result.explanation,
          lastUpdate: new Date().toLocaleDateString()
        }

        setCompany(updatedCompany)
      } catch (error) {
        console.log('Error fetching data:', error.message)
        // Fallback to original company data with generated history
        const companyId = Number(id) || 1
        const companyData = companiesById[companyId] || null
        if (companyData) {
          const fallbackHistory = generateCreditHistory(companyData.creditScore || 650)
          setCompany({
            ...companyData,
            creditHistory: fallbackHistory
          })
        }
      } finally {
        setLoading(false)
      }
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={dashboardRef}>
        {/* Back Button */}
        <motion.div
          id="back-button"
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

        {/* Company Hero — split 2-column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            {/* Left: Company Info */}
            <div className="flex-1 flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/6 flex items-center justify-center flex-shrink-0">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-10 h-10 text-white/60" />
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{company.name}</h1>
                <p className="text-white/60 mt-2 max-w-2xl">{company.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70 text-sm">
                  <div className="flex items-center gap-2"><Building2 className="w-4 h-4" />{company.industry}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{company.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" />{company.employees}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Founded {company.founded}</div>
                </div>
              </div>
            </div>

            {/* Right: Score Box */}
            <div className="w-full sm:w-56 flex-shrink-0 text-left sm:text-right">
              <div className="flex flex-col sm:items-end">
                <div className="text-5xl md:text-6xl font-extrabold text-white">{company.creditScore}</div>
                {company.creditRating && (
                  <div className="text-2xl font-bold text-white/80 mt-1">{company.creditRating}</div>
                )}
              </div>
              <div className={`inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-full text-sm font-medium ${getRiskColor(company.riskLevel)} bg-white/3`}> 
                {getRiskIcon(company.riskLevel)}
                <span>{company.riskLevel} Risk</span>
              </div>
              <div className="text-white/50 text-sm mt-3">Last update: {company.lastUpdate}</div>
            </div>
          </div>

          {/* Quick Actions (top-right float) */}
          <div id="dashboard-actions" className="mt-4 flex flex-wrap items-center gap-3 justify-start sm:justify-end">
            <Link to={`/CompanyDashboard/${id}/PeerComparison`}>
              <button className="bg-dark-surface/60 hover:bg-dark-elevated/80 text-white text-sm px-3 py-2 rounded-lg border border-white/[0.04]">
                Compare with Peers
              </button>
            </Link>
            <button
              onClick={handleToggleWatchlist}
              className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
                inWatchlist
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/40'
                  : 'bg-dark-surface/60 hover:bg-dark-elevated/80 text-white border-white/[0.04]'
              }`}
            >
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            <button 
              onClick={handleExportPdf} 
              disabled={isExporting}
              className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </motion.div>

        {/* Key Financial Ratios & KPIs — grouped 2x3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {(() => {
            const fm = company.financialMetrics || {}
            const { debtToEquity, revenueGrowthPct, netIncome, volatility, newsSentiment } = fm
            const liquidityPlaceholder = 'TBD'

            const formatSentiment = (s) => {
              if (!s) return 'N/A'
              return typeof s === 'string' ? s : s.label || 'N/A'
            }

            const cards = [
              { key: 'leverage', label: 'Debt-to-Equity', value: debtToEquity ?? '—', icon: <DollarSign className="w-5 h-5 text-white/60" /> },
              { key: 'growth', label: 'Revenue Growth %', value: revenueGrowthPct ?? '—', icon: <TrendingUp className="w-5 h-5 text-white/60" /> },
              { key: 'profit', label: 'Net Income', value: netIncome ?? '—', icon: <DollarSign className="w-5 h-5 text-white/60" /> },
              { key: 'stability', label: 'Volatility', value: volatility ?? '—', icon: <AlertTriangle className="w-5 h-5 text-white/60" /> },
              { key: 'sentiment', label: 'News Sentiment', value: formatSentiment(newsSentiment), icon: <TrendingDown className="w-5 h-5 text-white/60" /> },
              { key: 'liquidity', label: 'Liquidity (Cash Flow)', value: liquidityPlaceholder, icon: <DollarSign className="w-5 h-5 text-white/60" /> }
            ]

            return cards.map((c, index) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm">{c.label}</div>
                  <div>{c.icon}</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{c.value}</div>
                <div className="text-white/50 text-xs mt-2">
                  {c.key === 'liquidity' ? 'Placeholder — add cash flow/covers' : ''}
                  {apiData && c.key !== 'liquidity' ? 'Live data' : ''}
                </div>
              </motion.div>
            ))
          })()}
        </div>

        {/* Charts and Activity — Chart left, Why this score on right (shifted down), Recent Activity full-width below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chart column (left) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Credit Score Trend</h3>
              <div className="flex items-center gap-2">
                {['1M','6M','1Y','5Y'].map((t) => (
                  <button key={t} className="text-sm px-3 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white">{t}</button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6"
            >
              {/* Credit Score Chart */}
              <div className="h-64 relative" ref={chartContainerRef}>
                <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} 260`} className="overflow-visible">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {company.creditHistory && (() => {
                    const data = company.creditHistory
                    const maxScore = Math.max(...data.map(d => d.score))
                    const minScore = Math.min(...data.map(d => d.score))
                    const scoreRange = maxScore - minScore || 100
                    const padding = scoreRange * 0.1
                    
                    const chartHeight = 240
                    
                    // Create points for the line
                    const points = data.map((item, index) => {
                      const x = (index / (data.length - 1)) * chartWidth
                      const y = chartHeight - ((item.score - (minScore - padding)) / (scoreRange + 2 * padding)) * chartHeight
                      return { x, y, score: item.score, date: item.date }
                    })
                    
                    // Create path string for line
                    const pathData = points.map((point, index) => 
                      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                    ).join(' ')
                    
                    // Create area path
                    const areaData = `${pathData} L ${points[points.length - 1].x} ${chartHeight} L 0 ${chartHeight} Z`
                    
                    return (
                      <g>
                        {/* Area fill */}
                        <path
                          d={areaData}
                          fill="url(#scoreGradient)"
                        />
                        
                        {/* Line */}
                        <path
                          d={pathData}
                          stroke="rgb(99, 102, 241)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        
                        {/* Data points */}
                        {points.map((point, index) => (
                          <g key={index}>
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="rgb(99, 102, 241)"
                              stroke="white"
                              strokeWidth="2"
                            />
                            {/* Highlight current day */}
                            {index === points.length - 1 && (
                              <circle
                                cx={point.x}
                                cy={point.y}
                                r="8"
                                fill="none"
                                stroke="rgb(99, 102, 241)"
                                strokeWidth="2"
                                strokeDasharray="4,2"
                                opacity="0.8"
                              />
                            )}
                          </g>
                        ))}
                        
                        {/* X-axis labels */}
                        {points.map((point, index) => (
                          <text
                            key={`label-${index}`}
                            x={point.x}
                            y={chartHeight + 20}
                            textAnchor="middle"
                            className="fill-white/60 text-xs"
                          >
                            {point.date}
                          </text>
                        ))}
                        
                        {/* Y-axis labels */}
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                          const yPos = chartHeight - (ratio * chartHeight)
                          const scoreValue = Math.round((minScore - padding) + ratio * (scoreRange + 2 * padding))
                          return (
                            <g key={`y-label-${index}`}>
                              <line
                                x1="-5"
                                y1={yPos}
                                x2={chartWidth}
                                y2={yPos}
                                stroke="white"
                                strokeOpacity="0.1"
                                strokeWidth="1"
                              />
                              <text
                                x="-10"
                                y={yPos + 4}
                                textAnchor="end"
                                className="fill-white/60 text-xs"
                              >
                                {scoreValue}
                              </text>
                            </g>
                          )
                        })}
                      </g>
                    )
                  })()}
                </svg>
              </div>
              
              {/* Chart Legend */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-white/60 text-sm">Credit Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-indigo-500 ring-opacity-50"></div>
                    <span className="text-white/60 text-sm">Today</span>
                  </div>
                </div>
                <div className="text-white/50 text-xs">
                  Past 7 days • Updated {new Date().toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why this score? (right) — shifted down to appear below the top of the chart */}
          <div className="mt-6 lg:mt-0 lg:pt-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Why this score?</h4>
              <p className="text-white/60 mb-4">
                {company.explanation || 'Score decreased due to lower sentiment (-5%) and higher volatility. Positive net income partially offset these risks.'}
              </p>

              {apiData && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-white/60">Key factors from analysis:</div>
                  <div className="text-sm text-white grid grid-cols-1 gap-1">
                    <div>• Debt/Equity: {formatDebtToEquity(apiData.details['Debt/Equity'])}</div>
                    <div>• Revenue Growth: {formatPercentage(apiData.details['Revenue Growth %'])}</div>
                    <div>• Volatility: {formatVolatility(apiData.details['Volatility'])}</div>
                    <div>• News Sentiment: {formatNewsSentiment(apiData.details['News Sentiment'])}</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Activity — full width below, spans both columns */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-4 sm:p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {company.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500/12 rounded-lg flex items-center justify-center">
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
              )) || (
                <div className="text-white/60 text-center py-8">No recent activity available</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
