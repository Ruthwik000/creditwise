import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Bookmark } from 'lucide-react'
import { companiesById } from '../lib/sampleData'
import { getWatchlist } from '../lib/watchlist'
import { Link } from 'react-router-dom'

const Watchlist = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const ids = getWatchlist()
    const list = ids.map((id) => companiesById[id]).filter(Boolean)
    setItems(list)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#111111]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Bookmark className="w-6 h-6 text-accent-blue" />Watchlist</h2>
        {items.length === 0 ? (
          <div className="text-white/60">Your watchlist is empty. Browse companies and add them to your watchlist.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((c) => (
              <Link to={`/companydashboard/${c.id}`} key={c.id} className="p-4 bg-white/[0.03] rounded-2xl hover:bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/6 rounded-lg overflow-hidden">
                    {c.logo ? <img src={c.logo} alt={c.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-white/8" />}
                  </div>
                  <div>
                    <div className="text-white font-medium">{c.name}</div>
                    <div className="text-white/60 text-sm">{c.ticker} • {c.sector}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist
