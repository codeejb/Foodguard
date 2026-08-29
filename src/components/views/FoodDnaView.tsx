import React, { useState } from 'react';
import {
  Dna,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Truck,
  Building2,
  Store,
  Factory,
  ShieldCheck,
  Thermometer,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const FoodDnaView: React.FC = () => {
  const { batches, selectedBatchId, setSelectedBatchId, setActiveTab } = useApp();
  const [localBatchInput, setLocalBatchInput] = useState(selectedBatchId || 'BATCH-DL-9042');

  const currentBatch = batches.find((b) => b.batch_id === (selectedBatchId || localBatchInput)) || batches[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localBatchInput.trim()) {
      const match = batches.find(
        (b) =>
          b.batch_id.toLowerCase().includes(localBatchInput.toLowerCase()) ||
          b.product_name.toLowerCase().includes(localBatchInput.toLowerCase())
      );
      if (match) {
        setSelectedBatchId(match.batch_id);
      }
    }
  };

  const journeySteps = [
    {
      title: 'Farm Origin',
      entity: currentBatch.supplier_name,
      type: 'Supplier',
      icon: Building2,
      time: 'Day 1 • 06:00',
      status: 'Passed',
      temp: '3.8°C',
      detail: 'Intake quality screening verified (pH 6.6)',
    },
    {
      title: 'Processing Facility',
      entity: currentBatch.factory_name,
      type: 'Factory',
      icon: Factory,
      time: 'Day 1 • 11:30',
      status: 'Passed',
      temp: '4.0°C',
      detail: 'HTST Pasteurization 72°C/15s complete',
    },
    {
      title: 'Cold Storage Hub',
      entity: currentBatch.warehouse_name,
      type: 'Warehouse',
      icon: Building2,
      time: 'Day 2 • 02:45',
      status: currentBatch.temp_deviation > 4 ? 'Flagged' : 'Passed',
      temp: `${currentBatch.storage_temperature}°C`,
      detail:
        currentBatch.temp_deviation > 4
          ? `Thermal spike recorded (+${currentBatch.temp_deviation}°C deviation)`
          : 'Cold bay temperature maintained within tolerance',
    },
    {
      title: 'Refrigerated Fleet',
      entity: currentBatch.distributor_name,
      type: 'Distributor / Logistics',
      icon: Truck,
      time: 'Day 2 • 07:15',
      status: 'In Transit',
      temp: `${Math.min(currentBatch.storage_temperature + 0.5, 12.0)}°C`,
      detail: 'Reefer telematics active across Delhi Ring Road corridor',
    },
    {
      title: 'Retail Store / Kitchen',
      entity: currentBatch.retailer_name,
      type: 'Retailer',
      icon: Store,
      time: 'Day 2 • 09:00',
      status: currentBatch.complaint_count > 0 ? 'Customer Grievances' : 'On Shelf',
      temp: `${currentBatch.storage_temperature}°C`,
      detail: `${currentBatch.complaint_count} citizen complaints reported`,
    },
  ];

  return (
    <div id="food-dna-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      {/* Header & Quick Batch Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Dna className="w-5 h-5 text-teal-600" />
            <span>Food DNA — Batch Provenance & Telemetry</span>
          </h2>
          <p className="text-xs text-slate-500">
            End-to-end supply chain trace, sensor temperature curve, and cryptographic ledger passport
          </p>
        </div>

        {/* Batch Lookup Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="food-dna-batch-search-input"
              type="text"
              value={localBatchInput}
              onChange={(e) => setLocalBatchInput(e.target.value)}
              placeholder="Enter Batch ID (e.g. BATCH-DL-9042)"
              className="bg-white border border-slate-200/90 rounded-2xl pl-9 pr-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-sm transition-colors"
          >
            Trace DNA
          </button>
        </form>
      </div>

      {/* Batch Overview Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-slate-100 font-mono font-extrabold text-xs text-slate-700 rounded-xl">
              {currentBatch.batch_id}
            </span>
            <span className="px-2.5 py-1 bg-teal-50 text-teal-800 font-bold text-xs rounded-xl border border-teal-200">
              {currentBatch.category}
            </span>
            <RiskBadge
              level={currentBatch.predicted_risk_level}
              score={currentBatch.predicted_risk_score}
            />
          </div>

          <h3 className="text-xl font-black text-slate-900">{currentBatch.product_name}</h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <div>
              <span className="font-semibold text-slate-400">Produced:</span>{' '}
              <span className="font-mono text-slate-700">{currentBatch.production_date}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400">Expiry:</span>{' '}
              <span className="font-mono text-slate-700">{currentBatch.expiry_date}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400">Target Temp:</span>{' '}
              <span className="font-mono text-slate-700">{currentBatch.target_temperature}°C</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400">Recorded Temp:</span>{' '}
              <span
                className={`font-mono font-bold ${
                  currentBatch.temp_deviation > 4 ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                {currentBatch.storage_temperature}°C (+{currentBatch.temp_deviation}°C)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('blockchain')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Verify Blockchain Passport</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-2xl text-xs font-bold border border-teal-200 transition-colors text-center"
          >
            Simulate Recall of Batch
          </button>
        </div>
      </div>

      {/* Visual Journey: Supplier -> Factory -> Warehouse -> Distributor -> Retailer (PDF Section 6) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            End-to-End Supply Chain Journey
          </h3>
          <span className="text-xs text-slate-400 font-mono">5 Node Custody Chain</span>
        </div>

        {/* Step Nodes Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            const isAbnormal = step.status === 'Flagged' || step.status === 'Customer Grievances';

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isAbnormal
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-slate-50/70 border-slate-100 hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Step 0{idx + 1}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isAbnormal ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-500">{step.title}</div>
                <div className="text-xs font-black text-slate-900 mt-0.5 line-clamp-1" title={step.entity}>
                  {step.entity}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Temp Log:</span>
                    <span className="font-mono font-bold text-slate-800">{step.temp}</span>
                  </div>
                  <p className={`text-[10px] leading-tight ${isAbnormal ? 'text-rose-700 font-bold' : 'text-slate-500'}`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Risk Explanation Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900">Explainable AI Risk Decomposition</h3>
          <p className="text-xs text-slate-500">
            Specific parametric risk weights calculated by FOODGUARD ML core
          </p>

          <div className="space-y-2 pt-1">
            {currentBatch.contributing_factors.map((factor, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3 text-xs"
              >
                <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg shrink-0 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Risk Factor #{i + 1}</div>
                  <p className="text-slate-600 mt-0.5">{factor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">Recommended Inspector Actions</h3>
            <div className="p-3.5 bg-teal-50 border border-teal-100 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-teal-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Immediate Standard Operating Procedure</span>
              </div>
              <p className="text-teal-900 leading-relaxed">
                {currentBatch.recommended_action}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('investigations')}
            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Assign Inspection Task</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
