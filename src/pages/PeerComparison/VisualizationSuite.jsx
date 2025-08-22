import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A'; // Handle null/undefined explicitly
    if (Math.abs(num) > 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (Math.abs(num) > 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (Math.abs(num) > 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (Math.abs(num) > 1e3) return `${(num / 1e3).toFixed(2)}K`; // Add K for thousands
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 }); // Format smaller numbers
};

function VisualizationSuite({ mainCompany, peers }) {
    const allCompanies = [mainCompany, ...peers];

    const data = allCompanies.map(c => ({
        name: c.name,
        revenue: c.revenue,
        netProfit: c.netProfit,
        marketCap: c.marketCap
    }));

    console.log("Chart Data:", data); // Keep this for now

    const metrics = [
        { key: 'revenue', label: 'Revenue', color: '#8884d8' },
        { key: 'netProfit', label: 'Net Profit', color: '#82ca9d' },
        { key: 'marketCap', label: 'Market Cap', color: '#ffc658' },
    ];

    return (
        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 h-full">
            <h2 className="text-xl font-bold text-white mb-4">Visualizations</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap="15%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" tick={{ fill: '#A0AEC0' }} />
                        <YAxis tickFormatter={formatNumber} tick={{ fill: '#A0AEC0' }} domain={[0, 100000000000]} minTickGap={5} />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#1A202C', 
                                border: '1px solid #4A5568', 
                                color: '#E2E8F0' 
                            }} 
                            formatter={(value, name, props) => [`${formatNumber(value)}`, `${props.payload.name} - ${props.name}`]} 
                        />
                        <Legend wrapperStyle={{ color: '#E2E8F0', paddingTop: '10px' }} />
                        {metrics.map(metric => (
                            <Bar 
                                key={metric.key} 
                                dataKey={metric.key} 
                                fill={metric.color} 
                                name={metric.label} 
                                minBarSize={metric.key === 'netProfit' ? 2 : undefined} 
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default VisualizationSuite;