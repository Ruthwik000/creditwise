import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, LogOut, Settings, Github } from 'lucide-react'
import { motion } from 'framer-motion'

const Header = ({ variant = 'dashboard', showSearch = false, searchTerm = '', onSearchChange }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = variant === 'landing' 
    ? `fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border/30 shadow-2xl' : 'bg-transparent'
      }`
    : 'bg-gradient-to-r from-[#0a0b0f]/95 via-[#111318]/95 to-[#1a1d24]/95 backdrop-blur-xl border-b border-white/[0.1] shadow-lg'

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group relative">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue rounded-2xl opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              
              {/* Main logo container */}
              <div className="relative w-11 h-11 bg-gradient-to-br from-accent-blue via-accent-purple to-accent-blue-light rounded-2xl flex items-center justify-center shadow-glow-md group-hover:shadow-glow-lg transition-all duration-500 border border-white/10 group-hover:border-white/20">
                <span className="text-white font-bold text-xl bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">C</span>
                
                {/* Inner tech pattern */}
                <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-green to-accent-green-light rounded-full border-2 border-dark-bg shadow-glow-sm animate-pulse"></div>
              
              {/* Tech grid overlay */}
              <div className="absolute inset-0 w-11 h-11 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:4px_4px]"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white via-accent-blue-light to-white bg-clip-text text-transparent group-hover:from-accent-blue group-hover:via-white group-hover:to-accent-purple transition-all duration-500">
                CreditWise
              </span>
              <span className="text-xs text-accent-blue/60 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                v2.1.0
              </span>
            </div>
            
            {/* Hover effect lines */}
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          {/* Search Bar (Dashboard only) */}
          {showSearch && (
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                {/* Search container with tech styling */}
                <div className="relative bg-gradient-to-r from-dark-surface/80 via-dark-elevated/70 to-dark-surface/80 backdrop-blur-xl rounded-2xl border border-dark-border/50 group-hover:border-accent-blue/30 transition-all duration-500 shadow-inner-glow">
                  
                  {/* Tech grid background */}
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[length:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Search icon */}
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-accent-blue group-hover:text-accent-blue-light transition-all duration-300" />
                  
                  {/* Input field */}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    placeholder="Search companies or sectors..."
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-12 pr-16 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                  />
                  
                  {/* Keyboard shortcut */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 text-xs text-gray-400 bg-dark-surface/80 rounded-lg border border-dark-border/50 font-mono">⌘</kbd>
                      <kbd className="px-2 py-1 text-xs text-gray-400 bg-dark-surface/80 rounded-lg border border-dark-border/50 font-mono">K</kbd>
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-blue/20 via-accent-purple/20 to-accent-blue/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ padding: '1px' }}>
                    <div className="w-full h-full bg-dark-surface/90 rounded-2xl"></div>
                  </div>
                </div>
                
                {/* Search suggestions indicator */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent-blue rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {variant === 'landing' ? (
              <>
                <button
                  onClick={() => {
                    const el = document.getElementById('features')
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    } else {
                      // navigate to landing with hash if not present on this page
                      window.location.href = '/#features'
                    }
                  }}
                  className="relative group px-4 py-3 bg-dark-surface/60 hover:bg-dark-elevated/80 border border-dark-border/50 hover:border-accent-blue/30 rounded-xl transition-all duration-300 backdrop-blur-sm flex items-center space-x-2"
                >
                  <span className="text-gray-200 group-hover:text-white font-medium">Features</span>
                </button>

                <a
                  href="https://github.com/Ruthwik000/creditwise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group p-3 bg-transparent hover:bg-dark-surface/40 rounded-xl transition-colors duration-200 border border-transparent hover:border-accent-blue/20"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative group flex items-center space-x-3 p-3 rounded-2xl hover:bg-dark-surface/50 transition-all duration-300 border border-transparent hover:border-accent-blue/20"
                >
                  {/* Avatar container */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-blue via-accent-purple to-accent-blue-light rounded-2xl flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300 border border-white/10">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-green to-accent-green-light rounded-full border-2 border-dark-bg animate-pulse"></div>
                    
                    {/* Tech grid overlay */}
                    <div className="absolute inset-0 w-10 h-10 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:3px_3px]"></div>
                  </div>
                  
                  {/* User info */}
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white">Admin</div>
                    <div className="text-xs text-gray-400 font-mono">ID: #2024</div>
                  </div>
                </button>

                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-dark-surface/95 via-dark-elevated/90 to-dark-surface/95 backdrop-blur-2xl rounded-2xl border border-dark-border/50 shadow-2xl shadow-accent-blue/10 py-3"
                  >
                    {/* Tech pattern background */}
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[length:8px_8px]"></div>
                    
                    <button className="relative w-full px-4 py-3 text-left hover:bg-accent-blue/10 flex items-center space-x-3 transition-all duration-200 group">
                      <Settings className="w-4 h-4 text-gray-400 group-hover:text-accent-blue transition-colors" />
                      <span className="text-gray-200 group-hover:text-white">Settings</span>
                    </button>
                    
                    <div className="mx-4 my-2 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                    
                    <button 
                      onClick={() => navigate('/')}
                      className="relative w-full px-4 py-3 text-left hover:bg-accent-red/10 flex items-center space-x-3 transition-all duration-200 group"
                    >
                      <LogOut className="w-4 h-4 text-gray-400 group-hover:text-accent-red transition-colors" />
                      <span className="text-gray-200 group-hover:text-accent-red">Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header