// Shared sample company data for local development and UI testing
export const companies = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    sector: 'Technology',
    industry: 'Technology',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center',
    creditScore: 785,
    riskLevel: 'Low',
    founded: '2015',
    employees: '500-1000',
    location: 'San Francisco, CA',
    revenue: '$50M - $100M',
    description: 'Leading technology solutions provider specializing in cloud infrastructure and AI-powered analytics.',
    lastUpdate: '2 hours ago',
    creditHistory: [
      { month: 'Jan', score: 720 },
      { month: 'Feb', score: 735 },
      { month: 'Mar', score: 750 },
      { month: 'Apr', score: 765 },
      { month: 'May', score: 780 },
      { month: 'Jun', score: 785 }
    ],
    financialMetrics: {
      totalDebt: '$15M',
      debtToEquity: '0.35',
      currentRatio: '2.1',
      quickRatio: '1.8',
      cashFlow: '+$8.5M'
    },
    recentActivity: [
      { date: '2024-01-15', type: 'payment', description: 'Loan payment processed', amount: '$250,000' },
      { date: '2024-01-10', type: 'credit_check', description: 'Credit report requested', amount: null },
      { date: '2024-01-05', type: 'application', description: 'New credit line application', amount: '$5M' }
    ]
  },
  {
    id: 2,
    name: 'GreenEnergy Inc',
    sector: 'Energy',
    industry: 'Energy',
    logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=300&fit=crop&crop=center',
    creditScore: 720,
    riskLevel: 'Medium',
    founded: '2018',
    employees: '100-500',
    location: 'Austin, TX',
    revenue: '$25M - $50M',
    description: 'Renewable energy company focused on solar and wind power solutions for commercial clients.',
    lastUpdate: '1 day ago',
    creditHistory: [
      { month: 'Jan', score: 680 },
      { month: 'Feb', score: 690 },
      { month: 'Mar', score: 700 },
      { month: 'Apr', score: 710 },
      { month: 'May', score: 715 },
      { month: 'Jun', score: 720 }
    ],
    financialMetrics: {
      totalDebt: '$8M',
      debtToEquity: '0.45',
      currentRatio: '1.8',
      quickRatio: '1.5',
      cashFlow: '+$3.2M'
    },
    recentActivity: [
      { date: '2024-01-12', type: 'payment', description: 'Equipment financing payment', amount: '$150,000' },
      { date: '2024-01-08', type: 'credit_check', description: 'Quarterly credit review', amount: null },
      { date: '2024-01-03', type: 'application', description: 'Working capital loan request', amount: '$2M' }
    ]
  },
  {
    id: 3,
    name: 'HealthPlus Systems',
    sector: 'Healthcare',
    industry: 'Healthcare',
    logo: '',
    creditScore: 655,
    riskLevel: 'Medium',
    founded: '2012',
    employees: '200-400',
    location: 'Boston, MA',
    revenue: '$10M - $25M',
    description: 'Healthcare software and services company focused on patient engagement and analytics.',
    lastUpdate: '3 days ago',
    creditHistory: [
      { month: 'Jan', score: 630 },
      { month: 'Feb', score: 640 },
      { month: 'Mar', score: 645 },
      { month: 'Apr', score: 650 },
      { month: 'May', score: 655 },
      { month: 'Jun', score: 655 }
    ],
    financialMetrics: {
      totalDebt: '$6M',
      debtToEquity: '0.6',
      currentRatio: '1.4',
      quickRatio: '1.1',
      cashFlow: '+$0.8M'
    },
    recentActivity: [
      { date: '2024-01-20', type: 'credit_check', description: 'Investor due diligence', amount: null },
      { date: '2024-01-11', type: 'payment', description: 'Supplier payment', amount: '$25,000' }
    ]
  },
  {
    id: 4,
    name: 'RetailWorks',
    sector: 'Retail',
    industry: 'Retail',
    logo: '',
    creditScore: 605,
    riskLevel: 'High',
    founded: '2009',
    employees: '50-200',
    location: 'Chicago, IL',
    revenue: '$5M - $15M',
    description: 'Regional retail chain specializing in home goods and lifestyle products.',
    lastUpdate: '5 hours ago',
    creditHistory: [
      { month: 'Jan', score: 600 },
      { month: 'Feb', score: 602 },
      { month: 'Mar', score: 605 },
      { month: 'Apr', score: 607 },
      { month: 'May', score: 603 },
      { month: 'Jun', score: 605 }
    ],
    financialMetrics: {
      totalDebt: '$12M',
      debtToEquity: '1.2',
      currentRatio: '0.9',
      quickRatio: '0.6',
      cashFlow: '-$1.2M'
    },
    recentActivity: [
      { date: '2024-01-18', type: 'application', description: 'Refinancing request', amount: '$1M' },
      { date: '2024-01-09', type: 'payment', description: 'Monthly rent payment', amount: '$12,000' }
    ]
  }
]

export const companiesById = companies.reduce((acc, c) => {
  acc[c.id] = c
  return acc
}, {})

export default companies
