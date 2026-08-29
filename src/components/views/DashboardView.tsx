import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  Thermometer,
  Truck,
  Users,
  Building2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Search,
  CheckCircle2,
  Sliders,
  FileText,
  Activity,
  Filter,
  Calendar,
  Clock,
  RotateCcw,
  Layers,
  ArrowUpDown,
  Tag,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CATEGORIES = ['All', 'Dairy', 'Poultry', 'Produce', 'Bakery', 'Seafood', 'Snacks', 'Beverages'];
const STATUSES = ['All', 'Near Expiry', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'Flagged for Review', 'Action Taken'];
const DATE_RANGES = [
  { id: 'All', label: 'All Dates' },
  { id: 'Today', label: 'Today (Aug 28)' },
  { id: '7Days', label: 'Last 7 Days' },
  { id: '30Days', label: 'Last 30 Days' },
  { id: 'NearExpiry', label: 'Near Expiry (<= 5 Days)' },
  { id: 'Custom', label: 'Custom Range' },
];

export const DashboardView: React.FC = () => {
  const {
    batches,
    complaints,
    investigations,
    overallRiskScore,
    overallRiskLevel,
    totalBatchesCount,
    highCriticalCount,
    openComplaintsCount,
    activeInvestigationsCount,
    priorityLocationsCount,
    setActiveTab,
    setSelectedBatchId,
    setSelectedInvestigationId,
    dashboardFilters,
    setDashboardFilters,
    resetDashboardFilters,
    filteredAndSortedBatches,
    setIsNotificationModalOpen,
  } = useApp();

  const [showAdvancedFilterDrawer, setShowAdvancedFilterDrawer] = useState(false);

  // Dynamic forecast data calculated from active risk levels
  const forecastData = [
    { time: 'Now (T+0)', riskIndex: overallRiskScore, complaints: openComplaintsCount },
    { time: '+24 Hours', riskIndex: Math.min(100, Math.round(overallRiskScore * 1.08)), complaints: Math.round(openComplaintsCount * 1.3) },
    { time: '+48 Hours', riskIndex: Math.min(100, Math.round(overallRiskScore * 1.15)), complaints: Math.round(openComplaintsCount * 1.6) },
    { time: '+72 Hours', riskIndex: Math.min(100, Math.round(overallRiskScore * 1.22)), complaints: Math.round(openComplaintsCount * 2.0) },
  ];

  // Supply chain tier compliance distribution
  const tierDistribution = [
    { tier: 'Farm Source', score: 94, color: '#10B981', label: '94%' },
    { tier: 'Processing', score: 88, color: '#14B8A6', label: '88%' },
    { tier: 'Cold Storage', score: Math.max(25, 100 - overallRiskScore), color: '#F97316', label: `${Math.max(25, 100 - overallRiskScore)}%` },
    { tier: 'Logistics', score: 72, color: '#8B5CF6', label: '72%' },
    { tier: 'Retail Chiller', score: 65, color: '#EC4899', label: '65%' },
  ];

  // Emerging Threats categorized
  const coldChainThreats = batches.filter(b => b.temp_deviation > 4.0);

  // Expiring Batches Watchlist (Shelf life <= 3 days)
  const expiringBatches = batches.filter(b => {
    if (!b.expiry_date) return false;
    const exp = new Date(b.expiry_date + 'T23:59:59Z');
    const simulatedDate = new Date('2026-08-28T07:00:00Z');
    const diffDays = Math.ceil((exp.getTime() - simulatedDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  });

  const hasActiveFilters =
    Boolean(dashboardFilters.search) ||
    dashboardFilters.category !== 'All' ||
    dashboardFilters.status !== 'All' ||
    dashboardFilters.dateRange !== 'All';

  return (
    <div id="foodguard-dashboard-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Top Responsible AI Banner */}
      <ResponsibleAiBanner />

      {/* Hero Header Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-black text-emerald-700 tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            LIVE SURVEILLANCE • DELHI NCR GRID
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Here’s your Delhi food-safety intelligence overview.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {expiringBatches.length > 0 && (
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>{expiringBatches.length} Expiring Soon</span>
            </button>
          )}

          <button
            id="dash-quick-sandbox-btn"
            onClick={() => setActiveTab('simulator')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simulate Interventions</span>
          </button>
        </div>
      </div>

      {/* Hero Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Emerald/Teal Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="lg:col-span-8 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 rounded-[2.5rem] p-7 text-white shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]"
        >
          {/* Subtle decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-48 h-48 rounded-full bg-emerald-400/10 blur-lg pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Circular Risk Index Gauge */}
            <div className="flex items-center gap-5">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-white/20"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={`${overallRiskLevel === 'CRITICAL' ? 'stroke-rose-400' : overallRiskLevel === 'HIGH' ? 'stroke-amber-400' : 'stroke-emerald-300'}`}
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * overallRiskScore) / 100 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-2xl font-black tracking-tight"
                  >
                    {overallRiskScore}
                  </motion.span>
                  <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
                    {overallRiskLevel} RISK
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                  DELHI FOOD SAFETY STATUS
                </div>
                <div className="text-lg font-black text-white mt-0.5">
                  Predicted Index {overallRiskScore}/100
                </div>
                <p className="text-xs text-emerald-100/90 mt-1 max-w-xs leading-relaxed font-medium">
                  Risk is monitored via 19 cold-chain IoT telemetry hubs, lab bio-chemical reports, and consumer grievance clusters.
                </p>
              </div>
            </div>

            {/* Middle Key Counts inside white capsule card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-800 shadow-xs shrink-0 w-full md:w-auto min-w-[210px] border border-white/60 transition-transform"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Active Surveillance
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-600 font-medium">Batches Monitored:</span>
                  <span className="font-mono font-black text-slate-900">{totalBatchesCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-600 font-medium">Critical / High:</span>
                  <span className="font-mono font-black text-red-600">{highCriticalCount} batches</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-600 font-medium">Open Grievances:</span>
                  <span className="font-mono font-black text-amber-600">{openComplaintsCount} reports</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar: Supply chain tier compliance bars */}
          <div className="relative z-10 pt-4 mt-4 border-t border-white/15 grid grid-cols-5 gap-2 text-center">
            {tierDistribution.map((tier, idx) => (
              <div key={tier.tier} className="space-y-1">
                <div className="text-[11px] font-extrabold text-emerald-100">{tier.label}</div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${tier.score}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
                    style={{ backgroundColor: tier.color }}
                  />
                </div>
                <div className="text-[10px] text-emerald-200/80 truncate font-medium">{tier.tier}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Companion Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
          className="lg:col-span-4 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-[2.5rem] p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden"
        >
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>Priority Alert</span>
            </div>

            <h3 className="text-xl font-black text-white leading-tight">
              Investigate Narela Cold Bay #4
            </h3>

            <p className="text-xs text-rose-100 leading-relaxed font-medium">
              Thermal sensor excursion (+7.8°C) detected across 2 dairy batches with 8 linked consumer complaints in South Delhi.
            </p>
          </div>

          <div className="relative z-10 pt-4 space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="dash-investigate-narela-btn"
              onClick={() => {
                setSelectedInvestigationId('INV-DL-001');
                setActiveTab('investigations');
              }}
              className="w-full py-2.5 px-4 bg-white text-rose-700 font-extrabold text-xs rounded-2xl shadow-xs hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Forensic Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            <p className="text-[10px] text-rose-200 text-center font-medium">
              INV-DL-001 • Preliminary Positive
            </p>
          </div>
        </motion.div>
      </div>

      {/* Dynamic KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Batches */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-[#E6FFFA] rounded-[2rem] border border-[#B2F5EA] p-5 flex flex-col justify-between gap-1 shadow-xs"
        >
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">Total Batches</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-950 font-mono my-1">{totalBatchesCount}</div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Live Synced
          </div>
        </motion.div>

        {/* High / Critical */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FFF5F5] rounded-[2rem] border border-[#FED7D7] p-5 flex flex-col justify-between gap-1 shadow-xs"
        >
          <div className="flex items-center justify-between text-red-800">
            <span className="text-xs font-bold uppercase tracking-wider">High / Critical</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-950 font-mono my-1">{highCriticalCount}</div>
          <div className="text-xs text-red-700 font-semibold">Immediate Audit Rec.</div>
        </motion.div>

        {/* Complaints */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FFF9EB] rounded-[2rem] border border-[#FEEBC8] p-5 flex flex-col justify-between gap-1 shadow-xs"
        >
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-bold uppercase tracking-wider">Complaints</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-950 font-mono my-1">{openComplaintsCount}</div>
          <div className="text-xs text-amber-700 font-semibold">Grievance Clusters</div>
        </motion.div>

        {/* Active Inquiries */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F0F5FF] rounded-[2rem] border border-[#D1E9FF] p-5 flex flex-col justify-between gap-1 shadow-xs"
        >
          <div className="flex items-center justify-between text-blue-800">
            <span className="text-xs font-bold uppercase tracking-wider">Investigations</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-950 font-mono my-1">{activeInvestigationsCount}</div>
          <div className="text-xs text-blue-700 font-semibold">Assigned to Leads</div>
        </motion.div>

        {/* Priority Zones */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FAF5FF] rounded-[2rem] border border-[#E9D8FD] p-5 flex flex-col justify-between gap-1 shadow-xs"
        >
          <div className="flex items-center justify-between text-purple-800">
            <span className="text-xs font-bold uppercase tracking-wider">Priority Zones</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-950 font-mono my-1">{priorityLocationsCount}</div>
          <div className="text-xs text-purple-700 font-semibold">Narela / Sahibabad</div>
        </motion.div>
      </div>

      {/* DASHBOARD SEARCH & ADVANCED MULTI-FILTER BAR */}
      <div id="dashboard-search-filters-card" className="bg-white rounded-[2rem] p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <h3 className="font-black text-base text-slate-900">Search & Filter Food Batches</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Filter by commodity category, inspection status, shelf-life date range, or keywords.
            </p>
          </div>

          {/* Quick Clear Button */}
          {hasActiveFilters && (
            <button
              id="reset-dashboard-filters-btn"
              onClick={resetDashboardFilters}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Text Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="dashboard-filter-search-input"
              type="text"
              value={dashboardFilters.search}
              onChange={(e) => setDashboardFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search batch ID, warehouse, item..."
              className="w-full bg-[#F9FBFC] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="lg:col-span-3">
            <select
              id="dashboard-category-filter-select"
              value={dashboardFilters.category}
              onChange={(e) => setDashboardFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-[#F9FBFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="All">All Food Categories</option>
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="lg:col-span-3">
            <select
              id="dashboard-status-filter-select"
              value={dashboardFilters.status}
              onChange={(e) => setDashboardFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full bg-[#F9FBFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="All">All Statuses & Risks</option>
              <option value="Near Expiry">⚠️ Near Expiry (&lt;= 3 Days)</option>
              <option value="CRITICAL">🔴 Critical Risk Level</option>
              <option value="HIGH">🟠 High Risk Level</option>
              <option value="MEDIUM">🟡 Medium Risk Level</option>
              <option value="LOW">🟢 Low Risk Level</option>
              <option value="Flagged for Review">🔍 Flagged for Review</option>
              <option value="Action Taken">✅ Action Taken</option>
            </select>
          </div>

          {/* Date Range Dropdown */}
          <div className="lg:col-span-2">
            <select
              id="dashboard-daterange-filter-select"
              value={dashboardFilters.dateRange}
              onChange={(e) => setDashboardFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="w-full bg-[#F9FBFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              {DATE_RANGES.map(dr => (
                <option key={dr.id} value={dr.id}>{dr.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Date Pickers when 'Custom' is selected */}
        {dashboardFilters.dateRange === 'Custom' && (
          <div className="p-3 bg-[#F9FBFC] rounded-2xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 animate-in slide-in-from-top-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Custom Range:
            </span>
            <div className="flex items-center gap-2">
              <label className="text-slate-500">From:</label>
              <input
                type="date"
                value={dashboardFilters.customStartDate || ''}
                onChange={(e) => setDashboardFilters(prev => ({ ...prev, customStartDate: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-800"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-slate-500">To:</label>
              <input
                type="date"
                value={dashboardFilters.customEndDate || ''}
                onChange={(e) => setDashboardFilters(prev => ({ ...prev, customEndDate: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-800"
              />
            </div>
          </div>
        )}

        {/* Active Filter Badges & Sort Order */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">Active Criteria:</span>
            {dashboardFilters.search && (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
                Keyword: "{dashboardFilters.search}"
                <button onClick={() => setDashboardFilters(prev => ({ ...prev, search: '' }))} className="hover:text-red-700 font-black">✕</button>
              </span>
            )}
            {dashboardFilters.category !== 'All' && (
              <span className="px-2.5 py-1 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-200 flex items-center gap-1">
                Category: {dashboardFilters.category}
                <button onClick={() => setDashboardFilters(prev => ({ ...prev, category: 'All' }))} className="hover:text-red-700 font-black">✕</button>
              </span>
            )}
            {dashboardFilters.status !== 'All' && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-bold rounded-lg border border-amber-200 flex items-center gap-1">
                Status: {dashboardFilters.status}
                <button onClick={() => setDashboardFilters(prev => ({ ...prev, status: 'All' }))} className="hover:text-red-700 font-black">✕</button>
              </span>
            )}
            {dashboardFilters.dateRange !== 'All' && (
              <span className="px-2.5 py-1 bg-purple-50 text-purple-800 font-bold rounded-lg border border-purple-200 flex items-center gap-1">
                Range: {dashboardFilters.dateRange}
                <button onClick={() => setDashboardFilters(prev => ({ ...prev, dateRange: 'All' }))} className="hover:text-red-700 font-black">✕</button>
              </span>
            )}
            {!hasActiveFilters && (
              <span className="text-slate-400 font-medium italic">Showing all {batches.length} batches</span>
            )}
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              id="dashboard-sort-select"
              value={dashboardFilters.sortBy}
              onChange={(e) => setDashboardFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-[#F9FBFC] border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="risk_desc">Predicted Risk: High to Low</option>
              <option value="risk_asc">Predicted Risk: Low to High</option>
              <option value="expiry_asc">Expiry Date: Earliest First</option>
              <option value="production_desc">Production Date: Newest First</option>
              <option value="complaints_desc">Citizen Complaints: Highest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* EXPIRATION WATCHLIST & SHELF-LIFE URGENCY ALERT BANNER */}
      {expiringBatches.length > 0 && (
        <div className="bg-red-50/70 border border-red-200/90 rounded-[2rem] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-red-950">
                  Critical Shelf-Life & Expiration Watchlist ({expiringBatches.length} items)
                </h3>
                <p className="text-xs text-red-700 font-medium">
                  Batches nearing expiry within 72 hours require immediate shelf clearance, priority redistribution, or quarantine.
                </p>
              </div>
            </div>

            <button
              onClick={() => setDashboardFilters(prev => ({ ...prev, status: 'Near Expiry' }))}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Filter Near-Expiry
            </button>
          </div>

          {/* Mini Cards of Expiring Food Items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {expiringBatches.slice(0, 3).map((item) => (
              <div
                key={item.batch_id}
                onClick={() => {
                  setSelectedBatchId(item.batch_id);
                  setActiveTab('fooddna');
                }}
                className="bg-white rounded-2xl p-3.5 border border-red-100 shadow-xs hover:border-red-300 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-500">{item.batch_id}</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-extrabold rounded-md">
                    Expires {item.expiry_date}
                  </span>
                </div>
                <div className="font-black text-xs text-slate-900 truncate">{item.product_name}</div>
                <div className="text-[11px] text-slate-500 truncate">📍 {item.warehouse_name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Middle Grid: Emerging Threats & Forecast Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Emerging Threats */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                <span>Emerging Food-Safety Threats</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Algorithmic detection of potential supply-chain abnormalities
              </p>
            </div>
            <button
              onClick={() => setActiveTab('riskmap')}
              className="text-xs text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Cold Chain Anomaly */}
            <div className="p-3.5 bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl flex items-start justify-between gap-3 hover:bg-red-100/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 text-red-700 rounded-xl mt-0.5">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-950">Potential Cold-Chain Excursion</span>
                    <span className="px-2 py-0.5 bg-red-200 text-red-800 text-[10px] font-bold rounded-md">
                      CRITICAL
                    </span>
                  </div>
                  <p className="text-xs text-red-800 mt-0.5 font-medium">
                    {coldChainThreats.length} batch(es) recorded storage temperatures above safety limit (+7.8°C at Narela Hub).
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedBatchId('BATCH-DL-9042');
                  setActiveTab('fooddna');
                }}
                className="px-3 py-1.5 bg-white text-red-800 font-bold text-xs rounded-xl border border-red-200 hover:bg-red-50 shrink-0 shadow-xs"
              >
                Trace DNA
              </button>
            </div>

            {/* Complaint Clusters */}
            <div className="p-3.5 bg-[#FFF9EB] border border-[#FEEBC8] rounded-2xl flex items-start justify-between gap-3 hover:bg-amber-100/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-950">Potential Grievance Cluster</span>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-[10px] font-bold rounded-md">
                      HIGH
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5 font-medium">
                    7 consumer reports linked across same dairy supplier and South Delhi retail distribution corridor.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('complaints')}
                className="px-3 py-1.5 bg-white text-amber-800 font-bold text-xs rounded-xl border border-amber-200 hover:bg-amber-50 shrink-0 shadow-xs"
              >
                Inspect
              </button>
            </div>

            {/* Transport Transit Anomaly */}
            <div className="p-3.5 bg-[#FAF5FF] border border-[#E9D8FD] rounded-2xl flex items-start justify-between gap-3 hover:bg-purple-100/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-950">Potential Transport Delay</span>
                    <span className="px-2 py-0.5 bg-purple-200 text-purple-800 text-[10px] font-bold rounded-md">
                      MEDIUM
                    </span>
                  </div>
                  <p className="text-xs text-purple-800 mt-0.5 font-medium">
                    Reefer Truck DL-14-889 exceeded SLA by 4.2h with recorded surface temperature fluctuation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('supplychain')}
                className="px-3 py-1.5 bg-white text-purple-800 font-bold text-xs rounded-xl border border-purple-200 hover:bg-purple-50 shrink-0 shadow-xs"
              >
                View Flow
              </button>
            </div>
          </div>
        </div>

        {/* Risk Forecast Chart */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">72-Hour Risk Horizon</h3>
              <p className="text-xs text-slate-500 font-medium">Statistical projection based on time-series telemetry</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold text-[10px] rounded-lg border border-emerald-200">
              AI Forecast Model
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '11px',
                    border: 'none',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="riskIndex"
                  name="Predicted Risk Index"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#riskGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-[#F9FBFC] border border-slate-200/70 rounded-2xl flex items-center justify-between text-xs font-medium">
            <span className="text-slate-600">Projected Risk Spike if Unmitigated:</span>
            <span className="font-mono font-extrabold text-red-600">
              +{Math.round(overallRiskScore * 0.22)} pts at 72H
            </span>
          </div>
        </div>
      </div>

      {/* FILTERED & SORTED FOOD BATCHES INVENTORY */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base text-slate-900">Food Batch Surveillance & Action Queue</h3>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-xs font-extrabold rounded-full">
                {filteredAndSortedBatches.length} of {batches.length} Records
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Ranked dynamically with shelf-life tracking, sensor telemetry, and contributing anomaly signals
            </p>
          </div>

          <button
            onClick={() => setActiveTab('copilot')}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Inspector Copilot</span>
          </button>
        </div>

        {filteredAndSortedBatches.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-[#F9FBFC] rounded-2xl border border-dashed border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-extrabold text-sm text-slate-800">No batches match your selected criteria</h4>
            <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
              Try loosening your search query, selecting another category, or clearing active filters.
            </p>
            <button
              onClick={resetDashboardFilters}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold tracking-wider text-[10px]">
                  <th className="pb-3 pl-2">Batch ID / Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Warehouse & Area</th>
                  <th className="pb-3">Expiry Date</th>
                  <th className="pb-3">Storage Temp</th>
                  <th className="pb-3">Risk Level</th>
                  <th className="pb-3">Contributing Factors</th>
                  <th className="pb-3 pr-2 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedBatches.map((batch) => {
                  // Check if near expiry
                  const simulatedDate = new Date('2026-08-28T07:00:00Z');
                  const expiry = batch.expiry_date ? new Date(batch.expiry_date + 'T23:59:59Z') : null;
                  const diffDays = expiry ? Math.ceil((expiry.getTime() - simulatedDate.getTime()) / (1000 * 60 * 60 * 24)) : 999;
                  const isExpiringSoon = diffDays <= 3;

                  return (
                    <tr
                      key={batch.batch_id}
                      className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                      onClick={() => {
                        setSelectedBatchId(batch.batch_id);
                        setActiveTab('fooddna');
                      }}
                    >
                      <td className="py-3 pl-2">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-slate-900 block">{batch.batch_id}</span>
                          <span className="font-bold text-slate-800 text-xs">{batch.product_name}</span>
                        </div>
                      </td>

                      <td className="py-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-semibold text-[11px]">
                          {batch.category}
                        </span>
                      </td>

                      <td className="py-3">
                        <div className="text-slate-700 font-medium">{batch.warehouse_name}</div>
                        <div className="text-[11px] text-slate-400">{batch.area_name}</div>
                      </td>

                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-medium ${isExpiringSoon ? 'text-red-700 font-bold' : 'text-slate-700'}`}>
                            {batch.expiry_date}
                          </span>
                          {isExpiringSoon && (
                            <span className="px-1.5 py-0.5 text-[9px] font-black bg-red-100 text-red-800 rounded">
                              {diffDays <= 0 ? 'EXPIRED' : `${diffDays}d left`}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 font-mono">
                        <span className={batch.temp_deviation > 2.0 ? 'text-amber-700 font-bold' : 'text-slate-700'}>
                          {batch.storage_temperature}°C
                        </span>
                        {batch.temp_deviation > 0 && (
                          <span className="text-[10px] text-amber-600 block font-semibold">
                            +{batch.temp_deviation}°C dev
                          </span>
                        )}
                      </td>

                      <td className="py-3">
                        <RiskBadge level={batch.predicted_risk_level} score={batch.predicted_risk_score} size="sm" />
                      </td>

                      <td className="py-3 text-slate-600 max-w-xs">
                        <span className="truncate block text-[11px]" title={batch.contributing_factors[0]}>
                          {batch.contributing_factors[0] || 'Standard parameters'}
                        </span>
                      </td>

                      <td className="py-3 pr-2 text-right">
                        <button
                          id={`inspect-batch-btn-${batch.batch_id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBatchId(batch.batch_id);
                            setActiveTab('fooddna');
                          }}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-xs shadow-xs"
                        >
                          Trace
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
