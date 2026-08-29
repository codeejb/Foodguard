import React from 'react';
import {
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FlaskConical,
  Building2,
  Users,
  ShieldAlert,
  Thermometer,
  Sparkles,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const InvestigationsView: React.FC = () => {
  const { investigations, selectedInvestigationId, setSelectedInvestigationId, setActiveTab } = useApp();

  return (
    <div id="investigations-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-indigo-600" />
            <span>Active Food-Safety Investigations & Forensics</span>
          </h2>
          <p className="text-xs text-slate-500">
            Multi-source evidence correlation dossier, laboratory testing tracking, and root-cause hypotheses
          </p>
        </div>
      </div>

      {/* Investigation Dossiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {investigations.map((inv) => (
          <div
            key={inv.investigation_id}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-xs text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-lg border border-indigo-200">
                      {inv.investigation_id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{inv.created_at}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mt-1">{inv.title}</h3>
                </div>
                <RiskBadge level={inv.risk_level} />
              </div>

              {/* Statistical AI Hypothesis (PDF Section 8) */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-extrabold text-slate-700 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>AI Forensic Hypothesis</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    Confidence: {inv.confidence_score}%
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {inv.ai_hypothesis}
                </p>
                <div className="text-[10px] text-slate-400 italic pt-1">
                  *Statistical lead only. Dispatched inspector must confirm calibration.
                </div>
              </div>

              {/* Evidence Pillars (PDF Section 8) */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">Evidence Matrix:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-rose-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Thermal Excursion</div>
                      <div className="font-mono font-bold text-rose-600">+{inv.temp_anomaly_degrees}°C anomaly</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Linked Complaints</div>
                      <div className="font-mono font-bold text-slate-800">{inv.complaint_count} reports</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Shared Hub</div>
                      <div className="font-bold text-slate-800 truncate">{inv.associated_warehouse}</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-purple-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Lab Status</div>
                      <div className="font-bold text-purple-700 truncate">{inv.lab_status}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Verification Checklist */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-800">Mandatory Verification Steps:</div>
                {inv.recommended_verification.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-teal-50/70 border border-teal-100 text-teal-950 text-xs rounded-xl flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Inspector Assignment */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <UserCheck className="w-4 h-4 text-teal-600" />
                <span className="font-medium">Lead: <strong>{inv.assigned_inspector}</strong></span>
              </div>

              <button
                onClick={() => setActiveTab('simulator')}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>Simulate Quarantine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
