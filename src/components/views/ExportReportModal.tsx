import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExportReportModal: React.FC = () => {
  const {
    isExportModalOpen,
    setIsExportModalOpen,
    batches,
    profile,
    activeModel,
    overallRiskScore,
    overallRiskLevel,
    highCriticalCount,
    openComplaintsCount,
  } = useApp();

  const downloadCSV = () => {
    const headers = ['Batch ID', 'Product', 'Warehouse', 'Area', 'Temp (°C)', 'Dev (°C)', 'Complaints', 'CFU', 'Risk Score', 'Risk Level', 'Action'];
    const rows = batches.map((b) => [
      b.batch_id,
      `"${b.product_name}"`,
      `"${b.warehouse_name}"`,
      `"${b.area_name}"`,
      b.storage_temperature,
      b.temp_deviation,
      b.complaint_count,
      b.microbial_cfu || 0,
      b.predicted_risk_score,
      b.predicted_risk_level,
      `"${b.recommended_action}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `FOODGUARD_Predictions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isExportModalOpen && (
        <div
          id="export-report-modal-backdrop"
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={() => setIsExportModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            id="export-report-modal-content"
            className="relative z-10 bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-5"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-xs">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Export Intelligence Dossier & Reports
                  </h2>
                  <p className="text-xs text-slate-500">
                    Statutory audit report format compliant with Delhi Food Safety Division
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors font-black text-sm"
              >
                ✕
              </button>
            </div>

            {/* Quick Action Download Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                id="export-predictions-csv-btn"
                onClick={downloadCSV}
                className="p-4 rounded-2xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-left transition-all space-y-1"
              >
                <FileSpreadsheet className="w-5 h-5 text-teal-700 mb-2" />
                <div className="font-extrabold text-xs text-teal-950">Export Predictions CSV</div>
                <div className="text-[11px] text-teal-800">Raw batch inference logs & scores</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                id="export-analysis-excel-btn"
                onClick={downloadCSV}
                className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-left transition-all space-y-1"
              >
                <FileText className="w-5 h-5 text-sky-700 mb-2" />
                <div className="font-extrabold text-xs text-sky-950">Export Analysis XLSX</div>
                <div className="text-[11px] text-sky-800">Multi-sheet dataset analytics</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                id="export-print-pdf-btn"
                onClick={handlePrintPDF}
                className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-left transition-all space-y-1 shadow-sm"
              >
                <Printer className="w-5 h-5 text-teal-400 mb-2" />
                <div className="font-extrabold text-xs text-white">Generate / Print PDF</div>
                <div className="text-[11px] text-slate-300">Official printable inspection dossier</div>
              </motion.button>
            </div>

            {/* Printable Audit Report Preview (PDF Section 34) */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 space-y-3 font-sans">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <div>
                  <div className="font-black text-slate-900 text-sm">
                    FOODGUARD X — STATE FOOD-SAFETY AUDIT SUMMARY
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Generated: {new Date().toLocaleString()} • Jurisdiction: Delhi NCR
                  </div>
                </div>
                <span className="px-2 py-1 bg-white font-mono font-bold text-[10px] text-slate-700 rounded-md border border-slate-200">
                  AUDIT DOSSIER #DL-2026-X
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400">Dataset Source:</span> <strong>{profile.fileName}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Data Quality Score:</span> <strong>{profile.qualityScore}/100</strong>
                </div>
                <div>
                  <span className="text-slate-400">Overall Risk Index:</span>{' '}
                  <strong className="text-rose-600">{overallRiskScore}/100 ({overallRiskLevel})</strong>
                </div>
                <div>
                  <span className="text-slate-400">Inference Model:</span>{' '}
                  <strong>{activeModel.modelVersion} ({activeModel.algorithm})</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Key High-Risk Priority Records:</div>
                {batches.filter((b) => b.predicted_risk_score > 75).map((b) => (
                  <div key={b.batch_id} className="text-[11px] text-slate-600 flex items-center justify-between">
                    <span>• {b.batch_id} ({b.product_name}) - {b.warehouse_name}</span>
                    <span className="font-mono font-bold text-rose-600">{b.predicted_risk_score}/100</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 italic leading-relaxed">
                <strong>Statutory Notice:</strong> This audit report is generated by AI/ML decision-support algorithms. Final enforcement actions require physical sample collection and laboratory culture confirmation in accordance with applicable food-safety laws.
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
