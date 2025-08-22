import React from 'react';
import { usePeerComparisonStore } from '../../lib/peerComparisonStore';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Helper to format numbers
const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    if (Math.abs(num) > 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (Math.abs(num) > 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (Math.abs(num) > 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
};

const metricsConfig = [
    { key: 'marketCap', label: 'Market Cap', format: formatNumber },
    { key: 'revenue', label: 'Revenue', format: formatNumber },
    { key: 'netProfit', label: 'Net Profit', format: formatNumber },
    { key: 'debtToEquity', label: 'Debt-to-Equity', format: (n) => (n === null || n === undefined) ? 'N/A' : n.toFixed(2) },
    { key: 'eps', label: 'EPS', format: (n) => (n === null || n === undefined) ? 'N/A' : `${n.toFixed(2)}` },
    { key: 'growthRate', label: 'Growth Rate', format: (n) => (n === null || n === undefined) ? 'N/A' : `${(n * 100).toFixed(1)}%` },
    { key: 'creditRating', label: 'Credit Rating' },
];

function ComparisonTable({ mainCompany, peers }) {
    const { sortConfig, setSortConfig } = usePeerComparisonStore();

    const allCompanies = [mainCompany, ...peers];

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        if (sortConfig.direction === 'ascending') return <ChevronUp className="inline w-4 h-4" />;
        return <ChevronDown className="inline w-4 h-4" />;
    };

    return (
        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Key Metrics Comparison</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/[0.06]">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Metric</th>
                            {allCompanies.map(company => (
                                <th key={company.id} className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">{company.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-white/[0.06]">
                        {metricsConfig.map(metric => (
                            <tr key={metric.key}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-white cursor-pointer" onClick={() => setSortConfig(metric.key)}>
                                    {metric.label} {getSortIcon(metric.key)}
                                </td>
                                                                {allCompanies.map(company => (
                                    <td key={`${company.id}-${metric.key}`} className="px-6 py-4 whitespace-nowrap text-white/80">
                                        {metric.format ? metric.format(company[metric.key]) : company[metric.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ComparisonTable;
