// Replace old sample data with the provided list of companies (raw data).
// We'll keep the raw input intact and programmatically enrich each record with
// the fields the UI expects (id, creditScore, riskLevel, creditHistory, financialMetrics, recentActivity).

export const rawCompanies = [
  {
    "company": "Apple Inc.",
    "ticker": "AAPL",
    "logo_url": "https://logo.clearbit.com/apple.com",
    "industry": "Technology (Consumer Electronics, Software, Services)",
    "description": "Multinational technology company that designs, develops, and sells consumer electronics, software, and online services.",
    "sector": "Technology",
    "hq": "Cupertino, CA",
    "employees": "164,000",
    "founded": 1976
  },
  {
    "company": "Microsoft Corp.",
    "ticker": "MSFT",
    "logo_url": "https://logo.clearbit.com/microsoft.com",
    "industry": "Technology (Software, Services, Hardware)",
    "description": "Multinational technology corporation that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.",
    "sector": "Technology",
    "hq": "Redmond, WA",
    "employees": "228,000",
    "founded": 1975
  },
  {
    "company": "Alphabet Inc. (Google) Class A",
    "ticker": "GOOGL",
    "logo_url": "https://logo.clearbit.com/google.com",
    "industry": "Technology (Internet Services, Software, Cloud Computing, AI)",
    "description": "Multinational conglomerate holding company specializing in Internet-related services and products, including search, cloud computing, and AI.",
    "sector": "Technology",
    "hq": "Mountain View, CA",
    "employees": "182,000",
    "founded": 1998
  },
  {
    "company": "Alphabet Inc. (Google) Class C",
    "ticker": "GOOG",
    "logo_url": "https://logo.clearbit.com/google.com",
    "industry": "Technology (Internet Services, Software, Cloud Computing, AI)",
    "description": "Multinational conglomerate holding company specializing in Internet-related services and products, including search, cloud computing, and AI.",
    "sector": "Technology",
    "hq": "Mountain View, CA",
    "employees": "182,000",
    "founded": 1998
  },
  {
    "company": "Amazon.com Inc.",
    "ticker": "AMZN",
    "logo_url": "https://logo.clearbit.com/amazon.com",
    "industry": "E-commerce, Cloud Computing, Digital Streaming, AI",
    "description": "Multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    "sector": "Consumer Discretionary",
    "hq": "Seattle, WA",
    "employees": "1,540,000",
    "founded": 1994
  },
  {
    "company": "NVIDIA Corp.",
    "ticker": "NVDA",
    "logo_url": "https://logo.clearbit.com/nvidia.com",
    "industry": "Semiconductors, Graphics Processors, AI, Data Centers",
    "description": "Multinational technology company that designs graphics processing units (GPUs) for gaming, professional, and data center markets.",
    "sector": "Technology",
    "hq": "Santa Clara, CA",
    "employees": "29,600",
    "founded": 1993
  },
  {
    "company": "Meta Platforms Inc. (Facebook)",
    "ticker": "META",
    "logo_url": "https://logo.clearbit.com/meta.com",
    "industry": "Social Media, Technology, Metaverse",
    "description": "Social media conglomerate that owns Facebook, Instagram, WhatsApp, and is developing virtual reality and metaverse technologies.",
    "sector": "Communication Services",
    "hq": "Menlo Park, CA",
    "employees": "77,800",
    "founded": 2004
  },
  {
    "company": "Tesla Inc.",
    "ticker": "TSLA",
    "logo_url": "https://logo.clearbit.com/tesla.com",
    "industry": "Automotive (Electric Vehicles), Energy Generation & Storage",
    "description": "Electric vehicle and clean energy company that designs and manufactures electric cars, energy storage systems, and solar panels.",
    "sector": "Consumer Discretionary",
    "hq": "Austin, TX",
    "employees": "140,500",
    "founded": 2003
  },
  {
    "company": "Berkshire Hathaway Inc. Class B",
    "ticker": "BRK.B",
    "logo_url": "https://logo.clearbit.com/berkshirehathaway.com",
    "industry": "Conglomerate (Insurance, Rail Transport, Utilities, Manufacturing, Retail)",
    "description": "Multinational conglomerate holding company that wholly owns numerous companies and holds minority interests in public companies.",
    "sector": "Financial Services",
    "hq": "Omaha, NE",
    "employees": "383,000",
    "founded": 1955
  },
  {
    "company": "Johnson & Johnson",
    "ticker": "JNJ",
    "logo_url": "https://logo.clearbit.com/jnj.com",
    "industry": "Pharmaceuticals, Medical Devices, Consumer Health",
    "description": "Multinational corporation that develops medical devices, pharmaceuticals, and consumer packaged goods.",
    "sector": "Healthcare",
    "hq": "New Brunswick, NJ",
    "employees": "152,700",
    "founded": 1886
  },
  {
    "company": "UnitedHealth Group Inc.",
    "ticker": "UNH",
    "logo_url": "https://logo.clearbit.com/unitedhealthgroup.com",
    "industry": "Healthcare (Health Insurance, Health Services)",
    "description": "Diversified health care company providing health care coverage, software, and data consultancy services.",
    "sector": "Healthcare",
    "hq": "Minnetonka, MN",
    "employees": "440,000",
    "founded": 1977
  },
  {
    "company": "JPMorgan Chase & Co.",
    "ticker": "JPM",
    "logo_url": "https://logo.clearbit.com/jpmorganchase.com",
    "industry": "Financial Services (Banking, Investment Banking, Asset Management)",
    "description": "Multinational investment bank and financial services holding company providing investment banking, commercial banking, and asset management.",
    "sector": "Financial Services",
    "hq": "New York, NY",
    "employees": "309,900",
    "founded": 1799
  },
  {
    "company": "Visa Inc.",
    "ticker": "V",
    "logo_url": "https://logo.clearbit.com/visa.com",
    "industry": "Financial Services (Payment Technology)",
    "description": "Multinational financial services corporation that facilitates electronic funds transfers through branded credit and debit cards.",
    "sector": "Financial Services",
    "hq": "San Francisco, CA",
    "employees": "26,500",
    "founded": 1958
  },
  {
    "company": "Mastercard Inc.",
    "ticker": "MA",
    "logo_url": "https://logo.clearbit.com/mastercard.com",
    "industry": "Financial Services (Payment Technology)",
    "description": "Multinational financial services corporation that processes payments between merchants and issuing banks for credit and debit cards.",
    "sector": "Financial Services",
    "hq": "Purchase, NY",
    "employees": "33,400",
    "founded": 1966
  },
  {
    "company": "Procter & Gamble Co.",
    "ticker": "PG",
    "logo_url": "https://logo.clearbit.com/pg.com",
    "industry": "Consumer Goods (Household & Personal Care Products)",
    "description": "Multinational consumer goods corporation specializing in household and personal care products including cleaning agents and personal care products.",
    "sector": "Consumer Staples",
    "hq": "Cincinnati, OH",
    "employees": "106,000",
    "founded": 1837
  },
  {
    "company": "Home Depot Inc.",
    "ticker": "HD",
    "logo_url": "https://logo.clearbit.com/homedepot.com",
    "industry": "Retail (Home Improvement)",
    "description": "Home improvement retailer selling tools, construction products, appliances, and services to consumers and professionals.",
    "sector": "Consumer Discretionary",
    "hq": "Atlanta, GA",
    "employees": "500,000",
    "founded": 1978
  },
  {
    "company": "Eli Lilly and Co.",
    "ticker": "LLY",
    "logo_url": "https://logo.clearbit.com/lilly.com",
    "industry": "Pharmaceuticals",
    "description": "Pharmaceutical corporation that discovers, develops, manufactures, and markets medicines for humans and animals.",
    "sector": "Healthcare",
    "hq": "Indianapolis, IN",
    "employees": "43,900",
    "founded": 1876
  },
  {
    "company": "Johnson Controls International",
    "ticker": "JCI",
    "logo_url": "https://logo.clearbit.com/johnsoncontrols.com",
    "industry": "Building Technologies, HVAC, Fire & Security",
    "description": "Multinational conglomerate producing fire, HVAC, and security equipment for buildings and automotive batteries.",
    "sector": "Industrials",
    "hq": "Cork, Ireland",
    "employees": "103,000",
    "founded": 1885
  },
  {
    "company": "Pfizer Inc.",
    "ticker": "PFE",
    "logo_url": "https://logo.clearbit.com/pfizer.com",
    "industry": "Pharmaceuticals, Biotechnology",
    "description": "Multinational pharmaceutical corporation that develops, manufactures, and sells medicines and vaccines for humans and animals.",
    "sector": "Healthcare",
    "hq": "New York, NY",
    "employees": "83,000",
    "founded": 1849
  },
  {
    "company": "Exxon Mobil Corp.",
    "ticker": "XOM",
    "logo_url": "https://logo.clearbit.com/exxonmobil.com",
    "industry": "Energy (Oil & Gas)",
    "description": "Multinational oil and gas corporation engaged in the exploration, production, transportation, and sale of crude oil and natural gas.",
    "sector": "Energy",
    "hq": "Irving, TX",
    "employees": "62,000",
    "founded": 1999
  },
  {
    "company": "Chevron Corp.",
    "ticker": "CVX",
    "logo_url": "https://logo.clearbit.com/chevron.com",
    "industry": "Energy (Oil & Gas)",
    "description": "Multinational energy corporation engaged in oil and gas exploration, production, refining, marketing, and transportation.",
    "sector": "Energy",
    "hq": "San Ramon, CA",
    "employees": "47,600",
    "founded": 1879
  },
  {
    "company": "Coca-Cola Co.",
    "ticker": "KO",
    "logo_url": "https://logo.clearbit.com/coca-cola.com",
    "industry": "Beverages",
    "description": "Multinational beverage corporation that manufactures, markets, and sells nonalcoholic beverage concentrates and syrups worldwide.",
    "sector": "Consumer Staples",
    "hq": "Atlanta, GA",
    "employees": "82,500",
    "founded": 1892
  },
  {
    "company": "PepsiCo Inc.",
    "ticker": "PEP",
    "logo_url": "https://logo.clearbit.com/pepsico.com",
    "industry": "Beverages, Food",
    "description": "Multinational food, snack, and beverage corporation with brands including Pepsi, Lay's, Gatorade, Tropicana, and Quaker.",
    "sector": "Consumer Staples",
    "hq": "Purchase, NY",
    "employees": "315,000",
    "founded": 1965
  },
  {
    "company": "Walmart Inc.",
    "ticker": "WMT",
    "logo_url": "https://logo.clearbit.com/walmart.com",
    "industry": "Retail (General Merchandise)",
    "description": "Multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores.",
    "sector": "Consumer Staples",
    "hq": "Bentonville, AR",
    "employees": "2,100,000",
    "founded": 1962
  },
  {
    "company": "Costco Wholesale Corp.",
    "ticker": "COST",
    "logo_url": "https://logo.clearbit.com/costco.com",
    "industry": "Retail (Wholesale Clubs)",
    "description": "Multinational corporation that operates membership-only warehouse clubs providing merchandise at discounted prices.",
    "sector": "Consumer Staples",
    "hq": "Issaquah, WA",
    "employees": "304,000",
    "founded": 1976
  },
  {
    "company": "AbbVie Inc.",
    "ticker": "ABBV",
    "logo_url": "https://logo.clearbit.com/abbvie.com",
    "industry": "Pharmaceuticals, Biotechnology",
    "description": "Biopharmaceutical company that discovers, develops, manufactures, and sells pharmaceuticals worldwide, focusing on immunology and oncology.",
    "sector": "Healthcare",
    "hq": "North Chicago, IL",
    "employees": "50,000",
    "founded": 2013
  },
  {
    "company": "Merck & Co. Inc.",
    "ticker": "MRK",
    "logo_url": "https://logo.clearbit.com/merck.com",
    "industry": "Pharmaceuticals",
    "description": "Multinational pharmaceutical company that produces prescription medicines, vaccines, biologic therapies, and animal health products.",
    "sector": "Healthcare",
    "hq": "Rahway, NJ",
    "employees": "68,000",
    "founded": 1891
  },
  {
    "company": "Broadcom Inc.",
    "ticker": "AVGO",
    "logo_url": "https://logo.clearbit.com/broadcom.com",
    "industry": "Semiconductors, Infrastructure Software",
    "description": "Multinational designer, developer, and supplier of semiconductor and infrastructure software products for data center, networking, and wireless markets.",
    "sector": "Technology",
    "hq": "San Jose, CA",
    "employees": "50,000",
    "founded": 1991
  },
  {
    "company": "Adobe Inc.",
    "ticker": "ADBE",
    "logo_url": "https://logo.clearbit.com/adobe.com",
    "industry": "Software (Creative, Marketing, Document Management)",
    "description": "Multinational computer software company known for multimedia and creativity software products including Photoshop, Illustrator, and Acrobat.",
    "sector": "Technology",
    "hq": "San Jose, CA",
    "employees": "29,200",
    "founded": 1982
  },
  {
    "company": "Salesforce Inc.",
    "ticker": "CRM",
    "logo_url": "https://logo.clearbit.com/salesforce.com",
    "industry": "Software (CRM, Cloud Computing)",
    "description": "Cloud-based software company providing customer relationship management (CRM) service and enterprise cloud computing solutions.",
    "sector": "Technology",
    "hq": "San Francisco, CA",
    "employees": "79,390",
    "founded": 1999
  },
  {
    "company": "Intel Corp.",
    "ticker": "INTC",
    "logo_url": "https://logo.clearbit.com/intel.com",
    "industry": "Semiconductors",
    "description": "Multinational corporation and technology company that designs and manufactures microprocessors and other semiconductor components.",
    "sector": "Technology",
    "hq": "Santa Clara, CA",
    "employees": "124,800",
    "founded": 1968
  },
  {
    "company": "Cisco Systems Inc.",
    "ticker": "CSCO",
    "logo_url": "https://logo.clearbit.com/cisco.com",
    "industry": "Networking Hardware, Telecommunications Equipment",
    "description": "Multinational digital communications technology corporation that develops, manufactures, and sells networking hardware and software.",
    "sector": "Technology",
    "hq": "San Jose, CA",
    "employees": "84,900",
    "founded": 1984
  },
  {
    "company": "Netflix Inc.",
    "ticker": "NFLX",
    "logo_url": "https://logo.clearbit.com/netflix.com",
    "industry": "Entertainment (Streaming Services, Production)",
    "description": "Media services provider and production company offering streaming television series and films including original content.",
    "sector": "Communication Services",
    "hq": "Los Gatos, CA",
    "employees": "15,000",
    "founded": 1997
  },
  {
    "company": "Qualcomm Inc.",
    "ticker": "QCOM",
    "logo_url": "https://logo.clearbit.com/qualcomm.com",
    "industry": "Semiconductors, Wireless Technology",
    "description": "Multinational semiconductor and telecommunications equipment company that designs and markets wireless telecommunications products and services.",
    "sector": "Technology",
    "hq": "San Diego, CA",
    "employees": "51,000",
    "founded": 1985
  },
  {
    "company": "Oracle Corp.",
    "ticker": "ORCL",
    "logo_url": "https://logo.clearbit.com/oracle.com",
    "industry": "Software (Database, Cloud Applications), Hardware",
    "description": "Multinational computer technology corporation specializing in database software, cloud computing, and enterprise software products.",
    "sector": "Technology",
    "hq": "Austin, TX",
    "employees": "164,000",
    "founded": 1977
  },
  {
    "company": "Texas Instruments Inc.",
    "ticker": "TXN",
    "logo_url": "https://logo.clearbit.com/ti.com",
    "industry": "Semiconductors (Analog & Embedded Processing)",
    "description": "Technology company that designs and manufactures semiconductors and various integrated circuits for analog and embedded processing applications.",
    "sector": "Technology",
    "hq": "Dallas, TX",
    "employees": "31,000",
    "founded": 1930
  },
  {
    "company": "AMD (Advanced Micro Devices)",
    "ticker": "AMD",
    "logo_url": "https://logo.clearbit.com/amd.com",
    "industry": "Semiconductors (Processors, Graphics)",
    "description": "Multinational semiconductor company that develops computer processors and related technologies for business and consumer markets.",
    "sector": "Technology",
    "hq": "Santa Clara, CA",
    "employees": "31,000",
    "founded": 1969
  },
  {
    "company": "Nike Inc.",
    "ticker": "NKE",
    "logo_url": "https://logo.clearbit.com/nike.com",
    "industry": "Apparel, Footwear, Sporting Goods",
    "description": "Multinational corporation engaged in the design, development, manufacturing, and worldwide marketing of footwear, apparel, and sporting goods.",
    "sector": "Consumer Discretionary",
    "hq": "Beaverton, OR",
    "employees": "83,700",
    "founded": 1964
  },
  {
    "company": "McDonald's Corp.",
    "ticker": "MCD",
    "logo_url": "https://logo.clearbit.com/mcdonalds.com",
    "industry": "Food Services (Fast Food)",
    "description": "Fast food corporation operating one of the largest fast food restaurant chains worldwide, serving hamburgers and other fast food items.",
    "sector": "Consumer Discretionary",
    "hq": "Chicago, IL",
    "employees": "200,000",
    "founded": 1940
  },
  {
    "company": "Starbucks Corp.",
    "ticker": "SBUX",
    "logo_url": "https://logo.clearbit.com/starbucks.com",
    "industry": "Food Services (Coffeehouse)",
    "description": "Multinational chain of coffeehouses and roastery reserves known for its coffee, espresso-based drinks, and food items.",
    "sector": "Consumer Discretionary",
    "hq": "Seattle, WA",
    "employees": "383,000",
    "founded": 1971
  },
  {
    "company": "Goldman Sachs Group Inc.",
    "ticker": "GS",
    "logo_url": "https://logo.clearbit.com/goldmansachs.com",
    "industry": "Financial Services (Investment Banking, Securities, Asset Management)",
    "description": "Multinational investment bank and financial services company offering investment banking, securities, and investment management services.",
    "sector": "Financial Services",
    "hq": "New York, NY",
    "employees": "49,100",
    "founded": 1869
  },
  {
    "company": "Morgan Stanley",
    "ticker": "MS",
    "logo_url": "https://logo.clearbit.com/morganstanley.com",
    "industry": "Financial Services (Investment Banking, Wealth Management)",
    "description": "Multinational investment bank and financial services company providing investment banking, securities, wealth management, and investment management services.",
    "sector": "Financial Services",
    "hq": "New York, NY",
    "employees": "82,000",
    "founded": 1935
  },
  {
    "company": "American Express Co.",
    "ticker": "AXP",
    "logo_url": "https://logo.clearbit.com/americanexpress.com",
    "industry": "Financial Services (Credit Cards, Travel Services)",
    "description": "Multinational financial services corporation specializing in payment cards, charge cards, and traveler's cheque businesses.",
    "sector": "Financial Services",
    "hq": "New York, NY",
    "employees": "77,300",
    "founded": 1850
  },
  {
    "company": "Boeing Co.",
    "ticker": "BA",
    "logo_url": "https://logo.clearbit.com/boeing.com",
    "industry": "Aerospace, Defense",
    "description": "Multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets, satellites, and telecommunications equipment worldwide.",
    "sector": "Industrials",
    "hq": "Arlington, VA",
    "employees": "156,000",
    "founded": 1916
  },
  {
    "company": "3M Co.",
    "ticker": "MMM",
    "logo_url": "https://logo.clearbit.com/3m.com",
    "industry": "Manufacturing (Diversified Technology, Industrial, Consumer Goods)",
    "description": "Multinational conglomerate corporation operating in industry, worker safety, healthcare, and consumer goods with over 60,000 products.",
    "sector": "Industrials",
    "hq": "Saint Paul, MN",
    "employees": "92,000",
    "founded": 1902
  },
  {
    "company": "Caterpillar Inc.",
    "ticker": "CAT",
    "logo_url": "https://logo.clearbit.com/caterpillar.com",
    "industry": "Manufacturing (Construction & Mining Equipment, Engines)",
    "description": "Fortune Global 500 corporation that designs, develops, engineers, manufactures, and sells machinery, engines, and financial products.",
    "sector": "Industrials",
    "hq": "Peoria, IL",
    "employees": "110,000",
    "founded": 1925
  },
  {
    "company": "IBM (International Business Machines)",
    "ticker": "IBM",
    "logo_url": "https://logo.clearbit.com/ibm.com",
    "industry": "Information Technology (Consulting, Software, Hardware, Cloud, AI)",
    "description": "Multinational technology corporation providing hardware, software, cloud-based services, and cognitive computing technologies.",
    "sector": "Technology",
    "hq": "Armonk, NY",
    "employees": "282,100",
    "founded": 1911
  },
  {
    "company": "General Electric Co.",
    "ticker": "GE",
    "logo_url": "https://logo.clearbit.com/ge.com",
    "industry": "Conglomerate (Aviation, Power, Renewable Energy, Healthcare)",
    "description": "Multinational conglomerate incorporated in New York operating in aviation, power, renewable energy, digital industry, and venture capital.",
    "sector": "Industrials",
    "hq": "Boston, MA",
    "employees": "168,000",
    "founded": 1892
  },
  {
    "company": "Lockheed Martin Corp.",
    "ticker": "LMT",
    "logo_url": "https://logo.clearbit.com/lockheedmartin.com",
    "industry": "Aerospace, Defense",
    "description": "Global aerospace, arms, defense, information technology, and technology corporation specializing in research, design, and manufacture of technology systems.",
    "sector": "Industrials",
    "hq": "Bethesda, MD",
    "employees": "122,000",
    "founded": 1995
  },
  {
    "company": "HealthPlus Systems",
    "ticker": "HPS",
    "logo_url": "https://via.placeholder.com/128x128/2563eb/ffffff?text=HPS",
    "industry": "Healthcare (Software, Patient Engagement, Analytics)",
    "description": "Healthcare software and services company focused on patient engagement and analytics solutions for healthcare providers.",
    "sector": "Healthcare",
    "hq": "Boston, MA",
    "employees": "200-400",
    "founded": 2012
  }
]

// Enrich raw companies with fields our UI expects. Deterministic mocks based on index.
export const companies = rawCompanies.map((c, idx) => {
  const id = idx + 1;
  const baseScore = 600 + ((id * 7) % 201); // 600-800-ish
  const creditScore = Math.min(850, baseScore);
  const riskLevel = creditScore >= 750 ? 'Low' : creditScore >= 650 ? 'Medium' : 'High';

  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const creditHistory = months.map((m, i) => ({ month: m, score: Math.max(500, creditScore - (5 * (5 - i))) }));

  const debtToEquity = ((id % 10) / 10 + 0.2).toFixed(2);
  const revenueGrowthPct = `${((id % 15) - 3)}%`;
  const netIncome = (id % 3 === 0) ? `-$${(id * 120).toLocaleString()}` : `+$${(id * 220).toLocaleString()}`;
  const volatility = ['Low','Medium','High'][id % 3];
  const sentimentScore = ((id * 11) % 101 - 50) / 100;
  const sentimentLabel = sentimentScore > 0.3 ? 'Positive' : sentimentScore < -0.3 ? 'Negative' : (sentimentScore === 0 ? 'Neutral' : 'Mixed');

  const recentActivity = [
    { date: `2024-08-${String((id % 28) + 1).padStart(2,'0')}`, type: 'credit_check', description: 'Quarterly credit review', amount: null },
    { date: `2024-07-${String((id % 28) + 2).padStart(2,'0')}`, type: 'payment', description: 'Scheduled payment', amount: `$${((id * 1500) % 200000).toLocaleString()}` }
  ];

  return {
    id,
    name: c.company,
    ticker: c.ticker,
    sector: c.sector || '',
    industry: c.industry || '',
    logo: c.logo_url || '',
    creditScore,
    riskLevel,
    founded: String(c.founded || ''),
    employees: c.employees || '',
    location: c.hq || '',
    revenue: c.revenue || '',
    description: c.description || '',
    lastUpdate: `${(id % 7) + 1} days ago`,
    creditHistory,
    financialMetrics: {
      debtToEquity,
      revenueGrowthPct,
      netIncome,
      volatility,
      newsSentiment: { label: sentimentLabel, score: Number(sentimentScore.toFixed(2)) }
    },
    recentActivity
  };
});

export const companiesById = companies.reduce((acc, c) => { acc[c.id] = c; return acc }, {});

export default companies;
