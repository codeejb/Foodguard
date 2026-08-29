import React from 'react';
import { Info, ShieldAlert, Sparkles } from 'lucide-react';

export const ResponsibleAiBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        id="responsible-ai-compact-banner"
        className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-xl text-sky-800 text-xs font-medium"
      >
        <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span>
          <strong>Decision Support:</strong> AI models generate <em>predicted risk signals</em>. Laboratory verification & human inspector judgment required.
        </span>
      </div>
    );
  }

  return (
    <div
      id="responsible-ai-full-banner"
      className="p-3.5 bg-gradient-to-r from-sky-50 via-teal-50/50 to-indigo-50 border border-sky-100 rounded-2xl flex items-start gap-3 text-xs text-sky-900"
    >
      <div className="p-1.5 bg-sky-100/80 rounded-lg text-sky-700 mt-0.5 shrink-0">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="font-bold text-sky-950 flex items-center gap-2">
          <span>Responsible AI & Food Safety Protocol</span>
          <span className="px-2 py-0.5 bg-sky-200/60 text-sky-800 font-semibold rounded-md text-[10px] uppercase tracking-wide">
            Assistance Mode
          </span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          FOODGUARD X provides <strong>statistical risk predictions</strong> and <strong>potential anomaly flagging</strong>. It is designed to assist food-safety inspectors in prioritizing investigations and does not replace certified laboratory testing or human statutory discretion.
        </p>
      </div>
    </div>
  );
};
