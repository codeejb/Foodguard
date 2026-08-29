import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Search,
  Fingerprint,
  FileCheck,
  RefreshCw,
  Info,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateBlockchainLedger, verifyBlockchainIntegrity } from '../../services/cryptoLedger';
import { BlockchainBlock } from '../../types';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const BlockchainPassportView: React.FC = () => {
  const { batches, selectedBatchId, setSelectedBatchId } = useApp();
  const currentBatch = batches.find((b) => b.batch_id === selectedBatchId) || batches[0];

  const [blocks, setBlocks] = useState<BlockchainBlock[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    tamperedIndex?: number;
    message: string;
  } | null>(null);

  useEffect(() => {
    async function loadLedger() {
      if (currentBatch) {
        const generated = await generateBlockchainLedger(currentBatch.batch_id, {
          product: currentBatch.product_name,
          supplier: currentBatch.supplier_name,
          factory: currentBatch.factory_name,
          warehouse: currentBatch.warehouse_name,
          distributor: currentBatch.distributor_name,
          retailer: currentBatch.retailer_name,
          temp: currentBatch.storage_temperature,
        });
        setBlocks(generated);
        setVerificationResult(null);
      }
    }
    loadLedger();
  }, [currentBatch]);

  const handleVerifyChain = async () => {
    setIsVerifying(true);
    setVerificationResult(null);
    try {
      const result = await verifyBlockchainIntegrity(blocks);
      setVerificationResult(result);
    } finally {
      setIsVerifying(false);
    }
  };

  const simulateTampering = () => {
    if (blocks.length > 2) {
      const tampered = [...blocks];
      tampered[2] = {
        ...tampered[2],
        metadata: { ...tampered[2].metadata, avg_temp: '3.0°C (TAMPERED)' },
        payload_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      };
      setBlocks(tampered);
      setVerificationResult(null);
    }
  };

  return (
    <div id="blockchain-food-passport-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Cryptographic Food Passport & SHA-256 Ledger</span>
          </h2>
          <p className="text-xs text-slate-500">
            Permissioned tamper-evident custody trail recording custody events from farm intake to retail delivery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="verify-chain-integrity-btn"
            onClick={handleVerifyChain}
            disabled={isVerifying}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Hashing Blocks...</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Verify Chain Integrity</span>
              </>
            )}
          </button>

          <button
            id="simulate-tamper-test-btn"
            onClick={simulateTampering}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors"
            title="Simulate modifying storage temperature to test cryptographic mismatch detection"
          >
            Tamper Test
          </button>
        </div>
      </div>

      {/* Mandatory Philosophical Disclaimer Banner (PDF Section 12) */}
      <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Ledger Integrity Boundary:</strong>
          <span>
            “Blockchain protects the integrity of recorded history; it does not prove the original input was truthful.”
            Laboratory verification and physical calibration remain essential.
          </span>
        </div>
      </div>

      {/* Verification Result Toast / Banner */}
      {verificationResult && (
        <div
          id="blockchain-verification-status-banner"
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between animate-in fade-in ${
            verificationResult.isValid
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {verificationResult.isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <div>
              <div className="text-sm font-black">
                {verificationResult.isValid ? 'Chain Valid — All Signatures Intact' : 'Mismatch Detected — Tampering Flagged'}
              </div>
              <p className="text-xs font-normal mt-0.5 opacity-90">{verificationResult.message}</p>
            </div>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-1 bg-white rounded-lg shadow-2xs">
            {verificationResult.isValid ? 'SHA-256 PASS' : 'HASH MISMATCH'}
          </span>
        </div>
      )}

      {/* Batch Header Selection */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Batch Passport</span>
          <h3 className="text-base font-black text-slate-900 mt-0.5">{currentBatch.product_name}</h3>
          <div className="text-xs text-slate-500 font-mono">Consignment ID: {currentBatch.batch_id}</div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-semibold">Select Batch:</label>
          <select
            value={currentBatch.batch_id}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-slate-800"
          >
            {batches.map((b) => (
              <option key={b.batch_id} value={b.batch_id}>
                {b.batch_id} — {b.product_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 6-Stage Cryptographic Timeline (Produced -> Tested -> Stored -> Transported -> Inspected -> Distributed) */}
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={block.event_id}
            className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:border-teal-200 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center">
                  0{index + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{block.event_type}</span>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-800 font-mono text-[10px] font-bold rounded-md border border-teal-200">
                      {block.event_id}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{block.entity}</span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Timestamp: {block.timestamp}
              </div>
            </div>

            {/* Metadata attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
              {Object.entries(block.metadata).map(([key, val]) => (
                <div key={key}>
                  <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
                  <span className="font-bold text-slate-800">{String(val)}</span>
                </div>
              ))}
            </div>

            {/* Cryptographic Hash signatures (SHA-256) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 pt-1">
              <div className="p-2 bg-slate-50 rounded-xl truncate">
                <span className="font-bold text-slate-400 uppercase">Prev Hash:</span> {block.previous_hash}
              </div>
              <div className="p-2 bg-teal-50/60 text-teal-900 border border-teal-100 rounded-xl truncate">
                <span className="font-bold text-teal-700 uppercase">Current Hash:</span> {block.current_hash}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
