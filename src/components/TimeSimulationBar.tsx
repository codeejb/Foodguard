import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimeSimulationBar: React.FC = () => {
  const {
    timeSimulation,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    advanceSimulationHours,
  } = useApp();

  return (
    <div
      id="time-simulation-top-bar"
      className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-4 mb-4 shadow-lg border border-teal-800/40 relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Simulation title & Simulated Clock */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                Demo Time Simulation Sandbox
              </span>
              <span className="px-2 py-0.5 bg-teal-900/80 border border-teal-700 text-teal-200 text-[10px] font-bold rounded-md">
                Cold-Chain Failure — Delhi
              </span>
            </div>
            <div className="text-sm font-black text-white font-mono mt-0.5">
              Simulated Time: {timeSimulation.simulatedTime} ({timeSimulation.stepName})
            </div>
          </div>
        </div>

        {/* Center: Live Causal Narrative */}
        <div className="flex-1 max-w-xl bg-black/30 backdrop-blur-xs border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-slate-300 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="line-clamp-2 leading-tight">
            <strong>Causal Vector:</strong> {timeSimulation.incidentNarrative}
          </p>
        </div>

        {/* Right: Step buttons & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="sim-step-1h"
            onClick={() => advanceSimulationHours(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeSimulation.currentStep === 1
                ? 'bg-teal-500 text-slate-950 font-black ring-2 ring-teal-300'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            +1 Hour
          </button>
          <button
            id="sim-step-6h"
            onClick={() => advanceSimulationHours(6)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeSimulation.currentStep === 2
                ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-200'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            +6 Hours
          </button>
          <button
            id="sim-step-24h"
            onClick={() => advanceSimulationHours(24)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeSimulation.currentStep === 3
                ? 'bg-rose-500 text-white font-black ring-2 ring-rose-300'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            +24 Hours
          </button>

          <button
            id="sim-reset-btn"
            onClick={resetSimulation}
            title="Reset to Baseline T+0"
            className="p-2 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Telemetry sub-pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-3 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Bay 4 Temp Drift:</span>
          <span className="font-bold text-amber-300 font-mono">+{timeSimulation.temperatureDrift.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Active Anomalies:</span>
          <span className="font-bold text-rose-300 font-mono">{timeSimulation.activeAnomalies} Facilities</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Complaint Grievances:</span>
          <span className="font-bold text-teal-300 font-mono">{timeSimulation.accumulatedComplaints} Logged</span>
        </div>
        <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400">
          <span>AI Prioritization:</span>
          <span className="text-emerald-400 font-semibold">Live Updating</span>
        </div>
      </div>
    </div>
  );
};
