import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, DollarSign, Calendar, MapPin, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Header from '../components/Header'
import ChartCard from '../components/ChartCard'
import { companiesById } from '../lib/sampleData'
import { isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist } from '../lib/watchlist'

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exportingPdf, setExportingPdf] = useState(false)
  const dashboardRef = useRef(null)

  const { id } = useParams()
  const [inWatchlist, setInWatchlist] = useState(false)

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
      setInWatchlist(isInWatchlist(companyId))
      setLoading(false)
    }

    fetchCompanyData()
  }, [id])

  const handleExportPdf = async () => {
    if (!company || !dashboardRef.current) return
    
    try {
      setExportingPdf(true)
      console.log('Starting PDF export...')
      
      // Wait a moment for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Get the main container element
      const element = dashboardRef.current
      
      // Scroll to top to ensure we capture from the beginning
      window.scrollTo(0, 0)
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Configure html2canvas options with better settings for dark themes
      const canvas = await html2canvas(element, {
        height: element.scrollHeight,
        width: element.scrollWidth,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        useCORS: true,
        allowTaint: true,  // Changed to true to allow more flexibility
        backgroundColor: '#030303',  // Ensure dark background
        scale: 1.5,  // Reduced scale to avoid memory issues
        logging: true,  // Enable logging to debug
        imageTimeout: 30000,  // Increased timeout
        removeContainer: true,
        foreignObjectRendering: false,  // Disable foreign object rendering
        ignoreElements: (element) => {
          // Skip elements that might cause issues
          return element.classList?.contains('no-pdf') || false
        },
        onclone: (clonedDoc, element) => {
          // Force styles on cloned document
          const style = clonedDoc.createElement('style')
          style.textContent = `
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              background: #030303 !important;
            }
            .bg-gradient-to-br {
              background: #030303 !important;
            }
          `
          clonedDoc.head.appendChild(style)
          
          // Remove backdrop-blur effects that don't render well
          const blurElements = clonedDoc.querySelectorAll('[class*="backdrop-blur"]')
          blurElements.forEach(el => {
            el.style.backdropFilter = 'none'
            el.style.webkitBackdropFilter = 'none'
          })
          
          // Ensure text is visible
          const textElements = clonedDoc.querySelectorAll('*')
          textElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el)
            if (computedStyle.color.includes('rgba') || computedStyle.color.includes('rgb')) {
              // Force white text for visibility
              if (el.classList.contains('text-white') || 
                  el.classList.contains('text-white/60') || 
                  el.classList.contains('text-white/70')) {
                el.style.color = '#ffffff !important'
              }
            }
          })
        }
      })

      console.log('Canvas created, dimensions:', canvas.width, 'x', canvas.height)

      // Check if canvas is blank
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const isBlank = imageData.data.every((value, index) => {
        // Check if all pixels are the same color (blank)
        return index % 4 === 3 ? true : value === imageData.data[0]
      })

      if (isBlank) {
        throw new Error('Canvas appears to be blank')
      }

      // Calculate PDF dimensions
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0

      // Convert canvas to high quality image
      const imgData = canvas.toDataURL('image/jpeg', 0.95)  // Use JPEG with high quality

      // Add first page
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      )
      heightLeft -= pageHeight

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(
          imgData,
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        )
        heightLeft -= pageHeight
      }

      // Generate filename with company name and date
      const filename = `${company.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`
      
      // Save the PDF
      pdf.save(filename)
      
      console.log('PDF export completed successfully')
    } catch (error) {
      console.error('Error exporting PDF:', error)
      
      // Fallback: try with simpler options
      try {
        console.log('Attempting fallback export...')
        const element = dashboardRef.current
        
        const canvas = await html2canvas(element, {
          backgroundColor: '#030303',
          scale: 1,
          useCORS: false,
          allowTaint: true,
          logging: false
        })
        
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          0,
          imgWidth,
          imgHeight
        )
        
        const filename = `${company.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`
        pdf.save(filename)
        
        console.log('Fallback PDF export completed')
      } catch (fallbackError) {
        console.error('Fallback export also failed:', fallbackError)
        alert('Failed to export PDF. Please try again or contact support.')
      }
    } finally {
      setExportingPdf(false)
    }
  }

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
      
      <div ref={dashboardRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Company Hero — split 2-column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 mb-8"
          style={{ 
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
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
              <div className="text-5xl md:text-6xl font-extrabold text-white">{company.creditScore}</div>
              <div className={`inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-full text-sm font-medium ${getRiskColor(company.riskLevel)} bg-white/3`}> 
                {getRiskIcon(company.riskLevel)}
                <span>{company.riskLevel} Risk</span>
              </div>
              <div className="text-white/50 text-sm mt-3">Last update: {company.lastUpdate}</div>
            </div>
          </div>

          {/* Quick Actions (top-right float) */}
          <div className="mt-4 flex flex-wrap items-center gap-3 justify-start sm:justify-end">
            <button className="bg-dark-surface/60 hover:bg-dark-elevated/80 text-white text-sm px-3 py-2 rounded-lg border border-white/[0.04]">
              Compare with Peers
            </button>
            <button 
              onClick={() => { 
                const newList = toggleWatchlist(company.id); 
                setInWatchlist(newList.includes(company.id)); 
              }} 
              className={`text-sm px-3 py-2 rounded-lg border ${inWatchlist ? 'bg-rose-600 text-white border-rose-500' : 'bg-dark-surface/60 text-white border-white/[0.04]'}`}
            >
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            <button 
              onClick={handleExportPdf}
              disabled={exportingPdf}
              className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {exportingPdf ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export PDF
                </>
              )}
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
              const pct = (s.score !== undefined && s.score !== null) ? `${Math.round(s.score * 100)}%` : null
              return pct ? `${s.label} (${pct})` : s.label
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
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm">{c.label}</div>
                  <div>{c.icon}</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{c.value}</div>
                <div className="text-white/50 text-xs mt-2">{c.key === 'liquidity' ? 'Placeholder — add cash flow/covers' : ''}</div>
              </motion.div>
            ))
          })()}
        </div>

        {/* Charts and Activity — Chart left, Why this score on right (shifted down), Recent Activity full-width below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chart column (left) */}
          <div className="order-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Credit Score Trend</h3>
              <div className="flex items-center gap-2">
                {['1M','6M','1Y','5Y'].map((t) => (
                  <button key={t} className="text-sm px-3 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.06] text-white/70">{t}</button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ChartCard title="" data={company.creditHistory} type="area" />
            </motion.div>
          </div>

          {/* Why this score? (right) — on mobile move directly under the chart */}
          <div className="order-2 md:order-2 mt-6 lg:mt-0 lg:pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.25 }} 
              className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 sm:p-6"
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <h4 className="text-lg font-semibold text-white mb-2">Why this score?</h4>
              <p className="text-white/60">Score decreased due to lower sentiment (-5%) and higher volatility. Positive net income partially offset these risks.</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-sm text-white/60">Top contributors:</div>
                <div className="text-sm text-white">Sentiment (-5%), Volatility (+), Net Income (+)</div>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity — full width below, spans both columns */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-2 order-3 md:order-3 bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-4 sm:p-6"
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {company.recentActivity.map((activity, index) => (
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
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard