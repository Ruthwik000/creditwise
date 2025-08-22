import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

function PeerComparisonHeader({ companyName, companyId, availablePeers, selectedPeerIds, onPeerSelection }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredPeers = searchTerm
    ? availablePeers.filter(peer =>
        peer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const selectedPeers = availablePeers.filter(peer => selectedPeerIds.includes(peer.id));

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <Link to={`/CompanyDashboard/${companyId}`} className="text-indigo-400 hover:underline text-sm">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white mt-1">
          Peer Comparison for {companyName}
        </h1>
      </div>
      <div className="mt-4 md:mt-0 w-full md:w-auto">
        <div className="text-sm font-medium text-white/60 mb-2">Select Peers to Compare</div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Delay to allow click on dropdown
            className="w-full md:w-64 bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {isFocused && filteredPeers.length > 0 && (
            <div className="absolute z-10 top-full mt-2 w-full md:w-64 bg-dark-elevated border border-white/10 rounded-lg shadow-lg">
              {filteredPeers.map(peer => (
                <button
                  key={peer.id}
                  onClick={() => {
                    onPeerSelection(peer.id);
                    setSearchTerm('');
                  }}
                  className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/10"
                >
                  {peer.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedPeers.map(peer => (
            <div key={peer.id} className="bg-indigo-600/20 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
              <span>{peer.name}</span>
              <button onClick={() => onPeerSelection(peer.id)} className="text-indigo-300 hover:text-white">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default PeerComparisonHeader;
