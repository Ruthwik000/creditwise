import React from 'react';

function ExportControls() {
  return (
    <div className="flex items-center space-x-4">
      <button className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
        Export as PDF
      </button>
    </div>
  );
}

export default ExportControls;
