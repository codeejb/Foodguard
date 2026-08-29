import React, { useState } from 'react';
import {
  AlertOctagon,
  Users,
  Search,
  Filter,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const ComplaintsView: React.FC = () => {
  const { complaints, batches, setSelectedBatchId, setActiveTab } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const total = complaints.length;
  const open = complaints.filter((c) => c.status === 'Open' || c.status === 'Escalated').length;
  const clusters = new Set(complaints.map((c) => c.potential_cluster_id).filter(Boolean)).size;
  const highPriority = complaints.filter((c) => c.severity === 'High').length;

  const filteredComplaints = complaints.filter((c) => {
    if (filterType !== 'All' && c.status !== filterType && c.severity !== filterType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.complaint_id.toLowerCase().includes(q) ||
        c.product_name.toLowerCase().includes(q) ||
        c.batch_id.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="complaints-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      {/* Header & KPI Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-600" />
            <span>Citizen Grievance & Complaint Clustering</span>
          </h2>
          <p className="text-xs text-slate-500">
            Citizen grievance reports with automated statistical clustering and masked privacy protection
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-400">Total Grievances</div>
          <div className="text-2xl font-black text-slate-900 font-mono">{total}</div>
          <div className="text-[10px] text-slate-500">Across Delhi NCR</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-400">Open / Active</div>
          <div className="text-2xl font-black text-rose-600 font-mono">{open}</div>
          <div className="text-[10px] text-rose-700 font-bold">Action Required</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-400">Potential Clusters</div>
          <div className="text-2xl font-black text-amber-600 font-mono">{clusters}</div>
          <div className="text-[10px] text-amber-700 font-bold">Common supply path</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-400">High Severity</div>
          <div className="text-2xl font-black text-purple-600 font-mono">{highPriority}</div>
          <div className="text-[10px] text-purple-700 font-bold">Priority triage</div>
        </div>
      </div>

      {/* Smart Clustering Spotlight (PDF Section 7 requirement) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/60 border border-amber-200/80 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-extrabold text-amber-950">
              Transparent Grievance Correlation Detected
            </h3>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-200/80 text-amber-900 font-extrabold text-[10px] rounded-full">
            CLUST-NARELA-MILK-01
          </span>
        </div>

        <div className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <span>Correlation Vector:</span>
            <span className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
              3 grievances → Pasteurized Milk → BATCH-DL-9042 → Narela Cold Bay 4 → Potential association.
            </span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            <em>Responsible AI Disclaimer:</em> This indicates a <strong>statistical potential association</strong>, not confirmed laboratory contamination. An inspector is dispatched to verify cold chain calibration.
          </p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-sm text-slate-900">Complaints Log</h3>
            <span className="text-xs text-slate-400 font-mono">({filteredComplaints.length} records)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter complaints..."
                className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px]">
                <th className="pb-3 pl-2">Grievance ID</th>
                <th className="pb-3">Product / Batch</th>
                <th className="pb-3">Area & Citizen ID</th>
                <th className="pb-3">Symptom / Type</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map((c) => (
                <tr key={c.complaint_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pl-2 font-mono font-bold text-slate-900">{c.complaint_id}</td>
                  <td className="py-3">
                    <div className="font-bold text-slate-800">{c.product_name}</div>
                    <div className="font-mono text-[10px] text-teal-700">{c.batch_id}</div>
                  </td>
                  <td className="py-3">
                    <div className="text-slate-700">{c.area}</div>
                    <div className="font-mono text-[10px] text-slate-400 font-semibold">{c.citizen_id}</div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-semibold rounded-md border border-amber-200 text-[11px]">
                      {c.type}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 font-mono text-[11px]">{c.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        c.status === 'Escalated'
                          ? 'bg-rose-100 text-rose-800'
                          : c.status === 'Open'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 pr-2 text-right">
                    <button
                      onClick={() => {
                        setSelectedBatchId(c.batch_id);
                        setActiveTab('fooddna');
                      }}
                      className="px-3 py-1 bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 font-bold rounded-xl border border-teal-200 text-xs transition-colors"
                    >
                      Trace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
