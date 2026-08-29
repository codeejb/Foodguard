import React, { useState } from 'react';
import {
  Search,
  Bell,
  Download,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    profile,
    loadDemoData,
    setIsExportModalOpen,
    highCriticalCount,
    unreadNotificationsCount,
    criticalNotificationsCount,
    notifications,
    setIsNotificationModalOpen,
    dashboardFilters,
    setDashboardFilters,
  } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Real-time Delhi food-safety intelligence & expiration surveillance' };
      case 'datacenter':
        return { title: 'Data Center', subtitle: 'Ingest, map, validate, and profile multi-format datasets' };
      case 'riskmap':
        return { title: 'Risk Map', subtitle: 'OpenStreetMap surveillance across Delhi NCR food corridors' };
      case 'fooddna':
        return { title: 'Food DNA Tracing', subtitle: 'End-to-end consignment journey & bio-chemical telemetry' };
      case 'complaints':
        return { title: 'Complaints Intelligence', subtitle: 'Citizen grievances & algorithmic cluster correlation' };
      case 'investigations':
        return { title: 'Active Investigations', subtitle: 'Root-cause forensic dossiers & laboratory verification leads' };
      case 'supplychain':
        return { title: 'Supply Chain Graph', subtitle: 'Interactive node-link topology from farm to fork' };
      case 'copilot':
        return { title: 'Inspector Copilot', subtitle: 'AI prioritization engine & procedural guidance assistant' };
      case 'simulator':
        return { title: 'What-If Simulator', subtitle: 'Intervention impact modeling & secondary supply evaluation' };
      case 'blockchain':
        return { title: 'Blockchain Food Passport', subtitle: 'Immutable SHA-256 permissioned ledger verification' };
      case 'mllab':
        return { title: 'ML Lab & Analytics', subtitle: 'Model training, explainability, metrics & versioning' };
      default:
        return { title: 'FOODGUARD X', subtitle: 'AI food-safety command center' };
    }
  };

  const { title, subtitle } = getTabTitle();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setDashboardFilters(prev => ({ ...prev, search: val }));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDashboardFilters(prev => ({ ...prev, search: '' }));
  };

  return (
    <header
      id="foodguard-top-header"
      className="bg-white rounded-[2rem] p-4 shadow-xs border border-slate-200/80 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      {/* Title & context */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
          {profile.isDemoData ? (
            <span
              id="demo-mode-indicator"
              className="px-2.5 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-full flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              SIMULATED (Delhi Demo)
            </span>
          ) : (
            <span
              id="user-dataset-indicator"
              className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Custom: {profile.fileName}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
      </div>

      {/* Center Search Bar with Fast Filter Indicator */}
      <div className="relative flex-1 max-w-md mx-0 md:mx-4">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="global-foodguard-search"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search batch ID, warehouse, food category, supplier..."
          className="w-full bg-[#F9FBFC] border border-slate-200/80 rounded-2xl pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
        {searchQuery ? (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold p-1"
            title="Clear search"
          >
            ✕
          </button>
        ) : (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <span className="text-[10px] text-slate-400 font-mono">⌘K</span>
          </div>
        )}
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* System Online Telemetry Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-800 rounded-2xl text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Surveillance Grid Live</span>
        </div>

        {/* Demo reset button if custom data is loaded */}
        {!profile.isDemoData && (
          <button
            id="reset-to-demo-data-btn"
            onClick={loadDemoData}
            title="Reload Delhi Default Demo Dataset"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset Demo</span>
          </button>
        )}

        {/* Export Dossier / Report */}
        <button
          id="open-export-report-btn"
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-extrabold shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Report</span>
        </button>

        {/* Notifications Popover and Modal Launcher */}
        <div className="relative">
          <button
            id="header-notifications-btn"
            onClick={() => setIsNotificationModalOpen(true)}
            className="p-2.5 bg-[#F9FBFC] hover:bg-slate-100 border border-slate-200/80 text-slate-700 rounded-2xl relative transition-colors shadow-xs"
            aria-label="Food Safety Notifications"
            title="View Real-Time Expiration & Safety Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
