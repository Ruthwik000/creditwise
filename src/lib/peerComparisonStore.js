import { create } from 'zustand';
import { companies, companiesById } from '../lib/sampleData';

// Helper functions from CompanyDashboard.jsx
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

const formatLargeNumber = (num) => {
  if (!num || num === 0) return '0'
  
  const absNum = Math.abs(num)
  const sign = num < 0 ? '-' : ''
  
  if (absNum >= 1e12) {
    return `${sign}${(absNum / 1e12).toFixed(1)}T`
  } else if (absNum >= 1e9) {
    return `${sign}${(absNum / 1e9).toFixed(1)}B`
  } else if (absNum >= 1e6) {
    return `${sign}${(absNum / 1e6).toFixed(1)}M`
  } else if (absNum >= 1e3) {
  return `${sign}${(absNum / 1e3).toFixed(1)}K`
  } else {
    return `${sign}${(absNum).toFixed(0)}`
  }
}

const formatPercentage = (num) => {
  if (num === null || num === undefined) return 'N/A'
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(1)}%`
}

const formatDebtToEquity = (ratio) => {
  if (ratio === null || ratio === undefined) return undefined
  return Number(ratio)
}

const formatVolatility = (vol) => {
  if (vol === null || vol === undefined) return 'N/A'
  if (vol <= 1) return 'Low'
  if (vol <= 3) return 'Medium'
  return 'High'
}

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

const generateCreditHistory = (currentScore) => {
  const history = []
  const today = new Date()
  
  for (let i = 6; i >= 1; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    
    const variation = (Math.random() - 0.5) * 100
    const historicalScore = Math.max(300, Math.min(850, currentScore + variation))
    
    history.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round(historicalScore),
      fullDate: date.toISOString().split('T')[0]
    })
  }
  
  history.push({
    date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: currentScore,
    fullDate: today.toISOString().split('T')[0]
  })
  
  return history
}

export const usePeerComparisonStore = create((set, get) => ({
  // STATE
  mainCompany: null,
  allCompanies: [],
  availablePeers: [], // List of { id, name } for the dropdown
  selectedPeerIds: [],
  peersData: [],      // Full data for selected peers
  isLoading: true,
  error: null,
  sortConfig: { key: 'marketCap', direction: 'descending' },

  // ACTIONS
  fetchInitialData: async (companyId) => {
    set({ isLoading: true, mainCompany: null, availablePeers: [], selectedPeerIds: [], peersData: [] });
    
    try {
      const initialCompanyData = companiesById[companyId];
      if (!initialCompanyData) {
        set({ isLoading: false, error: 'Company not found' });
        return;
      }

      const encodedName = encodeURIComponent(initialCompanyData.name);
      const response = await fetch(`https://credit-wise.onrender.com/predict/${encodedName}/${initialCompanyData.ticker}`);
      const result = await response.json();

      

      const currentScore = Math.round(result.prediction * 1000);
      const creditHistory = generateCreditHistory(currentScore);

      const updatedCompany = {
        ...initialCompanyData,
        creditScore: currentScore,
        riskLevel: scoreToRating(result.prediction).risk,
        creditRating: scoreToRating(result.prediction).rating,
        creditHistory: creditHistory,
        debtToEquity: formatDebtToEquity(result.details['Debt/Equity']),
        financialMetrics: {
          revenueGrowthPct: formatPercentage(result.details['Revenue Growth %']),
          netIncome: formatLargeNumber(result.details['Net Income']),
          volatility: formatVolatility(result.details['Volatility']),
          newsSentiment: {
            label: formatNewsSentiment(result.details['News Sentiment']),
            score: result.details['News Sentiment']
          }
        },
        revenue: Number(result.details['Revenue']) || (Number(result.details['Net Income']) * 100) || 0,
        marketCap: Number(result.details['Market Cap']) || (Number(result.details['Net Income']) * 1000) || 0,
        netProfit: Number(result.details['Net Income']),
        growthRate: Number(result.details['Revenue Growth %']),
        eps: Number(result.details['EPS']) || (Number(result.details['Net Income']) / (Number(initialCompanyData.employees.replace(/[^0-9.-]+/g,"")) || 100000)) || 0,
        explanation: result.explanation,
        lastUpdate: new Date().toLocaleDateString()
      };

      const allCompanies = Object.values(companiesById);
      const peersForDropdown = allCompanies.filter(c => c.id !== companyId).map(c => ({ id: c.id, name: c.name }));

      set({
        mainCompany: updatedCompany,
        allCompanies: allCompanies,
        availablePeers: peersForDropdown,
        selectedPeerIds: [],
        peersData: [],
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching initial company data:', error);
      set({ isLoading: false, error: 'Failed to fetch company data' });
    }
  },

  // This action is triggered when the user selects/deselects peers in the UI
  setSelectedPeers: async (peerIds) => {
    set({ selectedPeerIds: peerIds, isLoading: true });
    
    try {
      const newPeersData = await Promise.all(peerIds.map(async (id) => {
        const initialPeerData = companiesById[id];
        if (!initialPeerData) {
          console.warn(`Peer with ID ${id} not found in companiesById.`);
          return null;
        }

        const encodedName = encodeURIComponent(initialPeerData.name);
        const response = await fetch(`https://credit-wise.onrender.com/predict/${encodedName}/${initialPeerData.ticker}`);
        const result = await response.json();

        

        const currentScore = Math.round(result.prediction * 1000);
        const creditHistory = generateCreditHistory(currentScore);

        return {
          ...initialPeerData,
          creditScore: currentScore,
          riskLevel: scoreToRating(result.prediction).risk,
          creditRating: scoreToRating(result.prediction).rating,
          creditHistory: creditHistory,
          debtToEquity: formatDebtToEquity(result.details['Debt/Equity']),
          financialMetrics: {
            revenueGrowthPct: formatPercentage(result.details['Revenue Growth %']),
            netIncome: formatLargeNumber(result.details['Net Income']),
            volatility: formatVolatility(result.details['Volatility']),
            newsSentiment: {
              label: formatNewsSentiment(result.details['News Sentiment']),
              score: result.details['News Sentiment']
            }
          },
          revenue: Number(result.details['Revenue']) || (Number(result.details['Net Income']) * 100) || 0,
          marketCap: Number(result.details['Market Cap']) || (Number(result.details['Net Income']) * 1000) || 0,
          netProfit: Number(result.details['Net Income']),
          growthRate: Number(result.details['Revenue Growth %']),
          eps: Number(result.details['EPS']) || (Number(result.details['Net Income']) / (Number(initialPeerData.employees.replace(/[^0-9.-]+/g,"")) || 100000)) || 0,
          explanation: result.explanation,
          lastUpdate: new Date().toLocaleDateString()
        };
      }));

      set({ peersData: newPeersData.filter(Boolean), isLoading: false }); // Filter out any nulls
    } catch (error) {
      console.error('Error fetching peer data:', error);
      set({ isLoading: false, error: 'Failed to fetch peer data' });
    }
  },

  setSortConfig: (key) => {
    set((state) => {
      const direction = state.sortConfig.key === key && state.sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending';
      return { sortConfig: { key, direction } };
    });
  },
}));