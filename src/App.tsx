/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TimeSimulationBar } from './components/TimeSimulationBar';
import { DashboardView } from './components/views/DashboardView';
import { DataCenterView } from './components/views/DataCenterView';
import { RiskMapView } from './components/views/RiskMapView';
import { FoodDnaView } from './components/views/FoodDnaView';
import { ComplaintsView } from './components/views/ComplaintsView';
import { InvestigationsView } from './components/views/InvestigationsView';
import { SupplyChainView } from './components/views/SupplyChainView';
import { InspectorCopilotView } from './components/views/InspectorCopilotView';
import { WhatIfSimulatorView } from './components/views/WhatIfSimulatorView';
import { BlockchainPassportView } from './components/views/BlockchainPassportView';
import { MlLabView } from './components/views/MlLabView';
import { ExportReportModal } from './components/views/ExportReportModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'datacenter':
        return <DataCenterView />;
      case 'riskmap':
        return <RiskMapView />;
      case 'fooddna':
        return <FoodDnaView />;
      case 'complaints':
        return <ComplaintsView />;
      case 'investigations':
        return <InvestigationsView />;
      case 'supplychain':
        return <SupplyChainView />;
      case 'copilot':
        return <InspectorCopilotView />;
      case 'simulator':
        return <WhatIfSimulatorView />;
      case 'blockchain':
        return <BlockchainPassportView />;
      case 'mllab':
        return <MlLabView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9FBFC] font-sans antialiased text-slate-800 selection:bg-emerald-500 selection:text-white">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Scrollable Main Viewport Canvas */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 max-w-7xl w-full mx-auto space-y-4">
          {/* Top Header */}
          <Header />

          {/* Dynamic Temporal Simulation Toolbar */}
          <TimeSimulationBar />

          {/* Active View Module with Smooth Motion Entrance */}
          <div className="pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.995 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Statutory Export & PDF Dossier Modal */}
      <ExportReportModal />

      {/* Real-time Expiration & Safety Notifications Center */}
      <NotificationCenterModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
