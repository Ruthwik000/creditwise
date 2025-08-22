import React from 'react';

const ratingToPercentage = {
    'AAA': 95,
    'AA+': 90,
    'AA': 85,
    'AA-': 80,
    'A+': 75,
    'A': 70,
    'A-': 65,
    'BBB+': 60,
    'BBB': 55,
    'BBB-': 50,
    'BB+': 45,
    'BB': 40,
    'BB-': 35,
    'B+': 30,
    'B': 25,
    'B-': 20,
    'CCC': 15,
    'CC': 10,
    'C': 5,
    'D': 0,
};

function CreditRatingScale({ mainCompany, peers }) {
    const allCompanies = [mainCompany, ...peers];

    return (
        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Comparative Credit Ratings</h2>
            <div className="relative h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 rounded-full">
                {allCompanies.map((company, index) => {
                    const percentage = ratingToPercentage[company.creditRating] ?? 50;
                    const isMain = company.id === mainCompany.id;
                    return (
                        <div 
                            key={company.id} 
                            title={`${company.name}: ${company.creditRating}`}
                            className={`absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                                isMain 
                                    ? 'w-4 h-4 bg-indigo-500 border-2 border-white shadow-lg' 
                                    : 'w-3 h-3 bg-white/80'
                            }`}
                            style={{ left: `${percentage}%` }}
                        />
                    );
                })}
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>D</span>
                <span>BB</span>
                <span>A</span>
                <span>AAA</span>
            </div>
        </div>
    );
}

export default CreditRatingScale;