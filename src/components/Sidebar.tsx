import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Database,
  MapPin,
  Dna,
  AlertOctagon,
  FileSearch,
  Network,
  Bot,
  Sliders,
  ShieldCheck,
  Cpu,
  Clock,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    highCriticalCount,
    openComplaintsCount,
    timeSimulation,
  } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'datacenter', label: 'Data Center', icon: Database, badge: 'Core' },
    { id: 'riskmap', label: 'Risk Map', icon: MapPin, badge: 'OSM' },
    { id: 'fooddna', label: 'Food DNA', icon: Dna },
    { id: 'complaints', label: 'Complaints', icon: AlertOctagon, count: openComplaintsCount },
    { id: 'investigations', label: 'Investigations', icon: FileSearch, count: highCriticalCount },
    { id: 'supplychain', label: 'Supply Chain', icon: Network },
    { id: 'copilot', label: 'Inspector Copilot', icon: Bot, isAi: true },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders },
    { id: 'blockchain', label: 'Blockchain Passport', icon: ShieldCheck },
    { id: 'mllab', label: 'ML Lab', icon: Cpu, badge: 'AI/ML' },
  ];

  return (
    <aside
      id="foodguard-sidebar"
      className="w-64 shrink-0 flex flex-col justify-between bg-white rounded-[2rem] p-4 shadow-sm border border-slate-200/80 my-3 ml-3 sticky top-3 h-[calc(100vh-1.5rem)] overflow-y-auto"
    >
      <div className="space-y-4">
        {/* Logo and Brand */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 px-2 py-2 cursor-pointer group rounded-2xl hover:bg-slate-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-slate-900">FOODGUARD</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-200">
                X
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">DELHI SAFETY INTEL</p>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <nav className="space-y-1 pt-1 relative" aria-label="Main Navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 text-left ${
                  isActive
                    ? 'text-emerald-900 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute inset-0 bg-emerald-50 border border-emerald-200/80 rounded-xl shadow-xs -z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-emerald-700' : item.isAi ? 'text-purple-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 relative z-10">
                  {item.badge && !isActive && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Incident / Storage Promo Card */}
      <div className="space-y-3 pt-3">
        {/* Incident Time Simulation Card */}
        <div className="bg-[#F0F5FF] border border-[#D1E9FF] rounded-2xl p-3.5 text-center relative overflow-hidden">
          <div className="w-8 h-8 mx-auto rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2 shadow-xs">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">Time Simulation</div>
          <p className="text-[11px] text-blue-700 mt-0.5 mb-2.5 leading-relaxed font-medium">
            {timeSimulation.isActive ? 'Incident cascade active' : 'Simulate cold-chain failure over 24h'}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="sidebar-simulator-toggle-btn"
            onClick={() => setActiveTab('simulator')}
            className="w-full py-1.5 px-3 bg-white text-blue-800 font-bold text-xs rounded-xl shadow-xs border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            Launch Sandbox
          </motion.button>
        </div>

        {/* Support & Online Status */}
        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-bold">Delhi Gov Engine</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v2.4-PRO</span>
        </div>
      </div>
    </aside>
  );
};
