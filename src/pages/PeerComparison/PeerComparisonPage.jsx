import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePeerComparisonStore } from '../../lib/peerComparisonStore';

import PeerComparisonHeader from './PeerComparisonHeader';
import CompanySnapshotCard from './CompanySnapshotCard';
import ComparisonTable from './ComparisonTable';
import VisualizationSuite from './VisualizationSuite';
import CreditRatingScale from './CreditRatingScale';
import ExportControls from './ExportControls';

function PeerComparisonPage() {
  const { id } = useParams();
  const pageRef = useRef(null);
  const {
    mainCompany,
    availablePeers,
    selectedPeerIds,
    peersData,
    isLoading,
    fetchInitialData,
    setSelectedPeers
  } = usePeerComparisonStore();

  useEffect(() => {
    // Default to '1' for the first company in sampleData if no id is present in URL
    fetchInitialData(parseInt(id) || 1);
  }, [id, fetchInitialData]);

  const handlePeerSelection = (peerId) => {
    const newSelection = selectedPeerIds.includes(peerId)
      ? selectedPeerIds.filter(pId => pId !== peerId)
      : [...selectedPeerIds, peerId];
    setSelectedPeers(newSelection);
  };

  if (!mainCompany) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#111111]">
        <div className="text-xl font-semibold text-white">Loading Company Data...</div>
      </div>
    );
  }

  const companiesForSnapshot = [mainCompany, ...peersData];
  const companiesForComparison = [mainCompany, ...peersData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#111111] p-4 md:p-6 lg:p-8" ref={pageRef}>
      <PeerComparisonHeader
        companyName={mainCompany.name}
        companyId={mainCompany.id}
        availablePeers={availablePeers}
        selectedPeerIds={selectedPeerIds}
        onPeerSelection={handlePeerSelection}
      />

      <main className="mt-6">
        <h2 className="text-2xl font-bold text-white mb-4">Company Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesForSnapshot.map(company => (
            <CompanySnapshotCard key={company.id} companyData={company} isMainCompany={company.id === mainCompany.id} />
          ))}
        </div>

        {companiesForComparison.length > 1 && (
          <>
            <div className="mt-8">
              <ComparisonTable mainCompany={mainCompany} peers={companiesForComparison.filter(c => c.id !== mainCompany.id)} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <VisualizationSuite mainCompany={mainCompany} peers={companiesForComparison.filter(c => c.id !== mainCompany.id)} />
              </div>
              <div className="space-y-8">
                <CreditRatingScale mainCompany={mainCompany} peers={companiesForComparison.filter(c => c.id !== mainCompany.id)} />
              </div>
            </div>
            
            <div className="mt-8">
              <ExportControls mainCompany={mainCompany} peers={companiesForComparison.filter(c => c.id !== mainCompany.id)} pageRef={pageRef} />
            </div>
          </>
        )}
        {companiesForComparison.length <= 1 && !isLoading && (
          <div className="text-center py-16 bg-white/5 mt-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white">Select peers to start comparison</h3>
            <p className="text-white/60 mt-2">Use the search bar above to add companies to the analysis.</p>
          </div>
        )}
        {isLoading && companiesForComparison.length > 1 && (
            <div className="text-center py-16">
                <p className="text-white/60">Loading selected peer data...</p>
            </div>
        )}
      </main>
    </div>
  );
}

export default PeerComparisonPage;