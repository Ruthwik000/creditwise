import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Eye, Zap, BarChart3 } from 'lucide-react'
import Header from '../components/Header'
import FeatureCard from '../components/FeatureCard'
import { HeroGeometric } from '../components/ui/shape-landing-hero'

const Landing = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Scores',
      description: 'Dynamic credit scores that update with market conditions and company events.'
    },
    {
      icon: Eye,
      title: 'Transparent Explanations',
      description: 'Clear, understandable reasoning behind every credit score calculation.'
    },
    {
      icon: Zap,
      title: 'Event Detection',
      description: 'AI-powered monitoring of news, filings, and market events affecting creditworthiness.'
    },
    {
      icon: BarChart3,
      title: 'Analyst Dashboard',
      description: 'Professional-grade analytics and visualization tools for credit professionals.'
    }
  ]

  return (
    <div className="min-h-screen">
      <Header variant="landing" />

      {/* Hero Section with Geometric Shapes */}
      <section className="relative">
        <HeroGeometric
          badge="CreditWise Intelligence"
          title1="Next-Gen Credit"
          title2="Intelligence Platform"
          description="AI-powered credit scoring with real-time market intelligence, transparent explanations, and predictive risk analytics."
        >
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link to="/login" className="relative z-30 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 inline-flex items-center space-x-2">
              <span>Get Started</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button className="relative z-30 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm inline-flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
              <span>Real-time Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </HeroGeometric>
      </section>

  {/* Features Section */}
  <section id="features" className="relative py-20 px-4 bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#111111] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-rose-500/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-violet-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-rose-200">
                Advanced Credit Intelligence
              </span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Leverage cutting-edge AI and real-time data to make informed credit decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-8 h-full hover:border-white/[0.2] transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-white/80" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-200 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-[#111111] to-[#030303] border-t border-white/[0.05] py-12">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-r from-rose-500/10 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  CreditWise
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center justify-center space-x-8 mb-6">
              <a href="#" className="text-white/60 hover:text-indigo-300 transition-colors duration-300 text-sm">
                Documentation
              </a>
              <a href="#" className="text-white/60 hover:text-rose-300 transition-colors duration-300 text-sm">
                GitHub
              </a>
              <a href="#" className="text-white/60 hover:text-violet-300 transition-colors duration-300 text-sm">
                Support
              </a>
            </div>

            {/* Copyright */}
            <p className="text-white/40 text-sm">
              © 2025 CreditWise Intelligence Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing