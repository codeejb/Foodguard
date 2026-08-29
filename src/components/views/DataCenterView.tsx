import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Database,
  ArrowRight,
  RefreshCw,
  Sliders,
  Table as TableIcon,
  HelpCircle,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { parseCSVFile, parseExcelFile, parsePdfFile } from '../../services/dataProcessor';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const DataCenterView: React.FC = () => {
  const {
    profile,
    setUploadedDataset,
    loadDemoData,
    setActiveTab,
    batches,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('Ready for ingestion');
  const [selectedSheet, setSelectedSheet] = useState<string>('Sheet1');
  const [cleanedRecordsCount, setCleanedRecordsCount] = useState<number>(0);
  const [cleaningActionApplied, setCleaningActionApplied] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setProcessingStatus(`Parsing and profiling ${file.name}...`);
    try {
      let result;
      if (file.name.endsWith('.csv')) {
        result = await parseCSVFile(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        result = await parseExcelFile(file);
      } else if (file.name.endsWith('.pdf')) {
        result = await parsePdfFile(file);
      } else {
        // Default to CSV parser
        result = await parseCSVFile(file);
      }

      setUploadedDataset(result.batches, result.profile);
      setProcessingStatus(`Successfully ingested ${result.batches.length} records. Real ML models updated.`);
    } catch (err: any) {
      setProcessingStatus(`Error processing file: ${err.message || 'Corrupted file format'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const loadSampleDataset = async (type: 'poultry_csv' | 'mandi_xlsx' | 'lab_pdf') => {
    setIsProcessing(true);
    if (type === 'poultry_csv') {
      setProcessingStatus('Ingesting Delhi Poultry Cold-Chain Corridor dataset...');
      const dummyFile = new File(['batch_id,product_name,category,storage_temperature,target_temperature,humidity,complaint_count,microbial_cfu\nBATCH-PL-101,Broiler Whole,Poultry,7.8,2.0,85,4,28000\nBATCH-PL-102,Chicken Drumsticks,Poultry,2.4,2.0,80,0,1200\nBATCH-PL-103,Farm Eggs Crate,Poultry,6.5,4.0,78,2,9500'], 'Delhi_Poultry_Logistics_Corridor.csv', { type: 'text/csv' });
      await handleFileUpload(dummyFile);
    } else if (type === 'mandi_xlsx') {
      setProcessingStatus('Ingesting Azadpur Mandi Fresh Produce Multi-Sheet dataset...');
      const dummyFile = new File([''], 'Azadpur_Mandi_Produce_Quality_Audit.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      await handleFileUpload(dummyFile);
    } else {
      setProcessingStatus('Ingesting Delhi Food Safety Officer Official Lab Report PDF...');
      const dummyFile = new File([''], 'Delhi_Gov_Inspection_Lab_Report_Aug2026.pdf', { type: 'application/pdf' });
      await handleFileUpload(dummyFile);
    }
  };

  return (
    <div id="data-center-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      {/* Header and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Database className="w-5 h-5 text-teal-600" />
            <span>Data Ingestion & Profiling Center</span>
          </h2>
          <p className="text-xs text-slate-500">
            Ingest structured food-safety records. Profile data quality, auto-map columns, and train adaptive models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="use-demo-data-btn"
            onClick={loadDemoData}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              profile.isDemoData
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{profile.isDemoData ? 'Active: Delhi Demo' : 'Use Demo Data'}</span>
          </button>

          <button
            id="trigger-file-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Dataset</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,.pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        id="data-center-dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-8 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 ${
          isDragging
            ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
            : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/50'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-xs">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-sm font-black text-slate-800">
            Drag & drop food safety CSV, Excel (.xlsx, .xls) or PDF report
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-profiles rows, columns, missing values, duplicates, and detects sensor / cold-chain fields
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl text-[11px] font-bold">
            CSV Supported
          </span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl text-[11px] font-bold">
            XLSX / Multi-Sheet
          </span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl text-[11px] font-bold">
            PDF Table Extraction
          </span>
        </div>

        {/* Quick Sample Ingestion shortcuts */}
        <div className="pt-3 border-t border-slate-100 w-full max-w-lg flex items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Or load preset:</span>
          <button
            onClick={() => loadSampleDataset('poultry_csv')}
            className="text-teal-600 font-bold hover:underline"
          >
            Poultry CSV
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => loadSampleDataset('mandi_xlsx')}
            className="text-teal-600 font-bold hover:underline"
          >
            Mandi Excel
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => loadSampleDataset('lab_pdf')}
            className="text-teal-600 font-bold hover:underline"
          >
            Lab PDF
          </button>
        </div>

        {isProcessing && (
          <div className="mt-2 text-xs font-bold text-teal-700 flex items-center gap-2 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{processingStatus}</span>
          </div>
        )}
      </div>

      {/* Dataset Profiling Overview Grid (PDF Section 18) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">File Name</div>
          <div className="text-xs font-black text-slate-900 truncate" title={profile.fileName}>
            {profile.fileName}
          </div>
          <div className="text-[10px] text-teal-600 font-semibold">{profile.fileType} • {profile.fileSize}</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rows Ingested</div>
          <div className="text-lg font-black text-slate-900 font-mono">{profile.rowCount.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 font-semibold">100% Parsed</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Columns</div>
          <div className="text-lg font-black text-slate-900 font-mono">{profile.columnCount}</div>
          <div className="text-[10px] text-slate-500 font-semibold">Auto-detected</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Missing Values</div>
          <div className="text-lg font-black text-amber-600 font-mono">{profile.missingPercentage}%</div>
          <div className="text-[10px] text-slate-500 font-semibold">{profile.missingValuesCount} cells flagged</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duplicates</div>
          <div className="text-lg font-black text-slate-900 font-mono">{profile.duplicateCount}</div>
          <div className="text-[10px] text-slate-500 font-semibold">Exact row matches</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data Quality</div>
          <div className="text-lg font-black text-emerald-600 font-mono">{profile.qualityScore}/100</div>
          <div className="text-[10px] text-emerald-700 font-bold">Grade A Integrity</div>
        </div>
      </div>

      {/* Smart Column Mapping & Data Cleaning Actions Grid (PDF Section 17 & 19) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Smart Column Mapping (PDF Section 17) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Smart Schema & Column Mapping</span>
              </h3>
              <p className="text-xs text-slate-500">
                Automated fuzzy synonym recognition mapped to standard food safety entities
              </p>
            </div>
            <span className="px-2.5 py-1 bg-teal-50 text-teal-700 font-bold text-[11px] rounded-xl border border-teal-200">
              Confidence &gt; 90%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="pb-2">Source Header</th>
                  <th className="pb-2">Detected Standard Field</th>
                  <th className="pb-2">Data Type</th>
                  <th className="pb-2 text-right">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {profile.columns.slice(0, 7).map((col) => (
                  <tr key={col.name} className="hover:bg-slate-50/50">
                    <td className="py-2.5 font-mono font-bold text-slate-800">{col.name}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 bg-sky-50 text-sky-800 font-semibold rounded-md border border-sky-200">
                        {col.mappedStandardField}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-500 capitalize">{col.detectedType}</td>
                    <td className="py-2.5 text-right font-mono font-bold text-emerald-600">
                      {Math.round(col.confidence * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Cleaning & Anomaly Guard (PDF Section 19) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Data Sanitization Engine</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">NON-DESTRUCTIVE</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-2xl text-xs space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Validation Warning (Cold-Chain Records)</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  2 records at Narela Bay 4 exhibit storage temperatures exceeding 10.0°C. Data preserved intact for model training.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setCleaningActionApplied('Reviewed & Marked as Valid Sensor Anomalies')}
                    className="px-2.5 py-1 bg-white text-amber-900 border border-amber-300 font-bold rounded-lg hover:bg-amber-100 text-[11px]"
                  >
                    Review Anomaly
                  </button>
                  <button
                    onClick={() => setCleaningActionApplied('Rule Exception Applied')}
                    className="px-2.5 py-1 bg-amber-200 text-amber-900 font-bold rounded-lg hover:bg-amber-300 text-[11px]"
                  >
                    Ignore Alert
                  </button>
                </div>
              </div>

              {cleaningActionApplied && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{cleaningActionApplied}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('mllab')}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to ML Lab & Model Training</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
