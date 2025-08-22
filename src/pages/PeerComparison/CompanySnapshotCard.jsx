import React from 'react';
import { Link } from 'react-router-dom';

const formatLargeNumber = (num) => {
  if (!num || num === 0) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1e12) {
    return `${sign}${(absNum / 1e12).toFixed(1)}T`;
  } else if (absNum >= 1e9) {
    return `${sign}${(absNum / 1e9).toFixed(1)}B`;
  } else if (absNum >= 1e6) {
    return `${sign}${(absNum / 1e6).toFixed(1)}M`;
  } else if (absNum >= 1e3) {
    return `${sign}${(absNum / 1e3).toFixed(1)}K`;
  } else {
    return `${sign}${absNum.toFixed(0)}`;
  }
};

function CompanySnapshotCard({ companyData, isMainCompany = false }) {
  const cardClasses = `bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border rounded-2xl p-6 ${isMainCompany ? 'border-indigo-500' : 'border-white/[0.06]'}`;

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">
          <Link to={`/CompanyDashboard/${companyData.id}`} className="hover:underline">{companyData.name}</Link>
        </h3>
        {isMainCompany && <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded-full">Selected</span>}
      </div>
      <p className="text-sm text-white/60">{companyData.industry}</p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-white/60">Market Cap:</span>
          <span className="font-semibold text-white">{formatLargeNumber(companyData.marketCap)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Revenue:</span>
          <span className="font-semibold text-white">{formatLargeNumber(companyData.revenue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Credit Rating:</span>
          <span className="font-bold text-lg text-indigo-400">{companyData.creditRating}</span>
        </div>
      </div>
    </div>
  );
}

export default CompanySnapshotCard;
