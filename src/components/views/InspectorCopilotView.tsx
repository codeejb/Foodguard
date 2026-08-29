import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  FileCheck,
  ListOrdered,
  ChevronRight,
  HelpCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const InspectorCopilotView: React.FC = () => {
  const { batches, setSelectedBatchId, setActiveTab } = useApp();

  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Good day Inspector Verma. I have processed telemetry across Delhi cold-storage facilities. Facility WH-DL-05 (Narela Bay 4) exhibits the highest priority due to a +7.8°C thermal anomaly combined with 8 linked citizen complaints. How would you like to proceed?',
      time: '08:00',
    },
  ]);
  const [inputText, setInputText] = useState('');

  // Dynamically computed ranking from active dataset (PDF Section 10)
  const rankedItems = [...batches]
    .sort((a, b) => b.predicted_risk_score - a.predicted_risk_score)
    .slice(0, 5);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = { sender: 'user' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Generate intelligent contextual inspector guidance response
    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('checklist') || lower.includes('inspect')) {
        aiReply = `📋 **Statutory On-Site Inspection Protocol for Narela Bay 4 (WH-DL-05):**\n1. Physical verification of evaporator coil & compressor sensor calibration.\n2. Rapid swab testing for Listeria monocytogenes and total plate count (TPC) on dairy batch BATCH-DL-9042.\n3. Verify continuous temperature chart recording logs from 02:00 to 07:00 IST.\n4. Issue Form VA under Delhi Food Safety Regulations for batch quarantine.`;
      } else if (lower.includes('recall') || lower.includes('quarantine')) {
        aiReply = `⚠️ **Recommended Intervention:** You can trigger an immediate automated batch hold via the What-If Simulator. This will prevent 3,800 units from entering retail distribution at Connaught Place and Defence Colony.`;
      } else if (lower.includes('standards') || lower.includes('fssai')) {
        aiReply = `📖 **Regulatory Standards (Chilled Dairy):**\n• Maximum permissible storage temp: +4.0°C (Narela recorded 11.8°C — Violation)\n• Maximum allowable bacterial CFU: 30,000 CFU/g (Recorded: 45,000 CFU/g)\n• Immediate sampling and laboratory verification required under Section 38.`;
      } else {
        aiReply = `Understood, Inspector. Based on our multi-source evidence tree, I recommend dispatching an on-site testing unit to Narela Bay 4 immediately while issuing an advance warning to South Delhi Express Dispatch.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <div id="inspector-copilot-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-teal-600" />
            <span>Inspector Copilot & AI Prioritization</span>
          </h2>
          <p className="text-xs text-slate-500">
            Automated ranking and contextual procedural guidance • <em>AI recommends; human inspector decides.</em>
          </p>
        </div>
      </div>

      {/* Grid: Priorities Ranking + Interactive AI Copilot Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Computed Facility & Batch Priorities (PDF Section 10) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-teal-600" />
                <span>Priority Action Queue</span>
              </h3>
              <p className="text-xs text-slate-500">Ranked by compound multi-factor risk score</p>
            </div>
            <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-mono font-bold rounded-lg border border-teal-200">
              Live Ranked
            </span>
          </div>

          <div className="space-y-3">
            {rankedItems.map((item, index) => (
              <div
                key={item.batch_id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="font-mono font-extrabold text-xs text-slate-900">
                        {item.warehouse_id}
                      </span>{' '}
                      <span className="text-xs text-slate-500">({item.area_name})</span>
                    </div>
                  </div>
                  <RiskBadge level={item.predicted_risk_level} score={item.predicted_risk_score} size="sm" />
                </div>

                <div className="text-xs font-bold text-slate-800">{item.product_name}</div>

                <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                  <strong>Why Prioritized:</strong> {item.contributing_factors.join(' • ')}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">
                    Batch: {item.batch_id}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedBatchId(item.batch_id);
                      setActiveTab('fooddna');
                    }}
                    className="text-xs text-teal-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Telemetry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Inspector Assistant & Protocol Generator */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Inspector Copilot Dialog</h3>
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Delhi Safety Advisory Engine Active
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">STRICT ADVISORY MODE</div>
            </div>

            {/* Chat message thread */}
            <div className="space-y-3 pt-3 max-h-[340px] overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-xs max-w-[88%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-teal-600 text-white font-medium rounded-br-xs'
                        : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-bl-xs whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <button
                onClick={() => handleSendMessage('Generate standard on-site inspection checklist for Narela Bay 4')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
              >
                📋 Generate Inspection Checklist
              </button>
              <button
                onClick={() => handleSendMessage('What are FSSAI permissible cold-chain temperature thresholds?')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
              >
                ⚖️ FSSAI Temp Rules
              </button>
              <button
                onClick={() => handleSendMessage('Recommend quarantine and recall strategy for batch BATCH-DL-9042')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
              >
                🛑 Recall Strategy
              </button>
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2">
              <input
                id="copilot-query-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask inspector copilot for protocols, standards, or incident analysis..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <button
                id="copilot-send-btn"
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl transition-colors shrink-0 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
