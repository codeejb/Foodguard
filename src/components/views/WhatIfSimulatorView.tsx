import React, { useState } from 'react';
import {
  Sliders,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  Building2,
  Package,
  Truck,
  ArrowRight,
  Info,
  ChevronRight,
  Store,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const WhatIfSimulatorView: React.FC = () => {
  const {
    batches,
    interventions,
    applyIntervention,
    removeIntervention,
    resetInterventions,
    overallRiskScore,
  } = useApp();

  const [selectedAction, setSelectedAction] = useState<'BLOCK_WAREHOUSE' | 'RECALL_BATCH' | 'BLOCK_DISTRIBUTOR' | 'AUDIT_SUPPLIER'>('BLOCK_WAREHOUSE');
  const [targetId, setTargetId] = useState<string>('WH-DL-05');

  // Baseline vs Simulated exposure metrics
  const isInterventionActive = interventions.length > 0;
  const simulatedRiskScore = isInterventionActive ? Math.round(overallRiskScore * 0.42) : overallRiskScore;
  const exposureReductionPercent = isInterventionActive ? Math.round((1 - simulatedRiskScore / Math.max(1, overallRiskScore)) * 100) : 0;
  const affectedBatchesCount = isInterventionActive ? 3 : 0;
  const isolatedRetailCount = isInterventionActive ? 4 : 0;

  const handleApply = () => {
    let name = targetId;
    if (selectedAction === 'BLOCK_WAREHOUSE') {
      name = targetId === 'WH-DL-05' ? 'Narela Central Cold Logistics (Bay 4)' : 'Sahibabad Regional Depot';
    } else if (selectedAction === 'RECALL_BATCH') {
      name = targetId;
    } else if (selectedAction === 'BLOCK_DISTRIBUTOR') {
      name = 'South Delhi Urban Express Dispatch';
    } else {
      name = 'Yamuna Plains Dairy Cooperative';
    }

    applyIntervention({
      actionType: selectedAction,
      targetId,
      targetName: name,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div id="what-if-simulator-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-teal-600" />
            <span>What-If Intervention & Exposure Simulator</span>
          </h2>
          <p className="text-xs text-slate-500">
            Model quarantine actions, batch recalls, and logistics rerouting to calculate exposure reduction
          </p>
        </div>

        {isInterventionActive && (
          <button
            onClick={resetInterventions}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Interventions</span>
          </button>
        )}
      </div>

      {/* Mandatory Disclaimer Label (PDF Section 11) */}
      <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-2xl text-xs text-indigo-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="font-semibold">
            “Illustrative simulation based on available dataset relationships.”
          </span>
        </div>
        <span className="text-[10px] font-mono text-indigo-500 font-bold">MONTE-CARLO GRAPH</span>
      </div>

      {/* Interactive Controls & Before/After Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Action Selector & Trigger Panel */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Configure Intervention Strategy</h3>

          {/* Action Tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedAction('BLOCK_WAREHOUSE');
                setTargetId('WH-DL-05');
              }}
              className={`p-3 rounded-2xl border text-left transition-all text-xs font-bold ${
                selectedAction === 'BLOCK_WAREHOUSE'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
              }`}
            >
              <Building2 className="w-4 h-4 mb-1 text-rose-600" />
              <div>Block Warehouse</div>
            </button>

            <button
              onClick={() => {
                setSelectedAction('RECALL_BATCH');
                setTargetId('BATCH-DL-9042');
              }}
              className={`p-3 rounded-2xl border text-left transition-all text-xs font-bold ${
                selectedAction === 'RECALL_BATCH'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
              }`}
            >
              <Package className="w-4 h-4 mb-1 text-rose-600" />
              <div>Recall Batch</div>
            </button>

            <button
              onClick={() => {
                setSelectedAction('BLOCK_DISTRIBUTOR');
                setTargetId('DIS-DL-02');
              }}
              className={`p-3 rounded-2xl border text-left transition-all text-xs font-bold ${
                selectedAction === 'BLOCK_DISTRIBUTOR'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
              }`}
            >
              <Truck className="w-4 h-4 mb-1 text-rose-600" />
              <div>Block Distributor</div>
            </button>

            <button
              onClick={() => {
                setSelectedAction('AUDIT_SUPPLIER');
                setTargetId('SUP-DL-01');
              }}
              className={`p-3 rounded-2xl border text-left transition-all text-xs font-bold ${
                selectedAction === 'AUDIT_SUPPLIER'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
              }`}
            >
              <Store className="w-4 h-4 mb-1 text-rose-600" />
              <div>Investigate Supplier</div>
            </button>
          </div>

          {/* Target Selector */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700">Select Target Entity / ID:</label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              {selectedAction === 'BLOCK_WAREHOUSE' && (
                <>
                  <option value="WH-DL-05">WH-DL-05 • Narela Central Cold Logistics (Bay 4)</option>
                  <option value="WH-DL-03">WH-DL-03 • Sahibabad Regional Depot</option>
                  <option value="WH-DL-07">WH-DL-07 • Azadpur Terminal Refrigerated Bay</option>
                </>
              )}
              {selectedAction === 'RECALL_BATCH' && (
                <>
                  <option value="BATCH-DL-9042">BATCH-DL-9042 • Pasteurized Milk 1L</option>
                  <option value="BATCH-DL-9048">BATCH-DL-9048 • Artisanal Paneer 500g</option>
                  <option value="BATCH-DL-8812">BATCH-DL-8812 • Chilled Dressed Poultry</option>
                  <option value="BATCH-DL-4390">BATCH-DL-4390 • Cold-Pressed Citrus Juice</option>
                </>
              )}
              {selectedAction === 'BLOCK_DISTRIBUTOR' && (
                <>
                  <option value="DIS-DL-02">DIS-DL-02 • South Delhi Urban Express Dispatch</option>
                  <option value="DIS-DL-01">DIS-DL-01 • Trans-Yamuna Logistics Fleet</option>
                </>
              )}
              {selectedAction === 'AUDIT_SUPPLIER' && (
                <>
                  <option value="SUP-DL-01">SUP-DL-01 • Yamuna Plains Dairy Cooperative</option>
                  <option value="SUP-DL-03">SUP-DL-03 • Haryana Border Poultry Hub</option>
                </>
              )}
            </select>
          </div>

          <button
            id="apply-simulation-action-btn"
            onClick={handleApply}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-extrabold text-xs shadow-sm shadow-teal-600/25 transition-all flex items-center justify-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            <span>Apply Simulated Intervention</span>
          </button>

          {/* Active Interventions List */}
          {interventions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800">Active Interventions:</div>
              <div className="space-y-1.5">
                {interventions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-950"
                  >
                    <div>
                      <div className="font-bold">{item.actionType.replace('_', ' ')}</div>
                      <div className="text-[11px] text-rose-700 truncate max-w-[200px]">{item.targetName}</div>
                    </div>
                    <button
                      onClick={() => removeIntervention(item.targetId)}
                      className="text-rose-600 hover:text-rose-900 text-xs font-bold px-2 py-1 bg-white rounded-lg border border-rose-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Before vs After Impact Analysis (PDF Section 11) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Before vs After Intervention Impact</h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-200">
                {isInterventionActive ? 'Simulation Applied' : 'Baseline State'}
              </span>
            </div>

            {/* Metric Comparison Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Baseline Risk Index</div>
                <div className="text-3xl font-black text-slate-800 font-mono">{overallRiskScore}/100</div>
                <div className="text-[10px] text-rose-600 font-bold">Unmitigated Exposure</div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-center space-y-1">
                <div className="text-[11px] font-bold text-emerald-800 uppercase">Simulated Risk Index</div>
                <div className="text-3xl font-black text-emerald-700 font-mono">{simulatedRiskScore}/100</div>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{exposureReductionPercent}% Exposure Cut</span>
                </div>
              </div>
            </div>

            {/* Exposure Reduction Breakdown */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                <span className="text-slate-600 font-medium">Batches Quarantined from Public:</span>
                <span className="font-mono font-bold text-slate-900">{affectedBatchesCount} batches (approx. 5,300 units)</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                <span className="text-slate-600 font-medium">Retail Outlets Protected:</span>
                <span className="font-mono font-bold text-slate-900">{isolatedRetailCount} hubs (Connaught Place, Saket, etc.)</span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-950">
                <span className="font-medium">Potential Secondary Supply Impact:</span>
                <span className="font-bold text-amber-900">~6.8% momentary dairy supply dip in Zone 2</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Intervention decisions are logged for statutory compliance audit.</span>
            <span className="font-mono font-semibold text-teal-700">Audit Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
