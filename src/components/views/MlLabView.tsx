import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  BarChart3,
  Layers,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Play,
  TrendingUp,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';

export const MlLabView: React.FC = () => {
  const {
    activeModel,
    modelsList,
    profile,
    retrainModel,
    switchActiveModel,
    batches,
  } = useApp();

  const [selectedAlgo, setSelectedAlgo] = useState<'Random Forest Classifier' | 'Gradient Boosting' | 'Isolation Forest Anomaly'>('Random Forest Classifier');
  const [isTraining, setIsTraining] = useState(false);

  const handleTrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      retrainModel(selectedAlgo);
      setIsTraining(false);
    }, 450);
  };

  return (
    <div id="ml-lab-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-600" />
            <span>ML Lab & Analytical Modeling Engine</span>
          </h2>
          <p className="text-xs text-slate-500">
            Train, evaluate, explain, and version supervised classifiers & unsupervised anomaly detectors on active datasets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="Random Forest Classifier">Random Forest Classifier (Ensemble)</option>
            <option value="Gradient Boosting">Gradient Boosting (XGBoost Inspired)</option>
            <option value="Isolation Forest Anomaly">Isolation Forest (Unsupervised Anomaly)</option>
          </select>

          <button
            id="retrain-model-btn"
            onClick={handleTrain}
            disabled={isTraining}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
          >
            {isTraining ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Computing Weights...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Train / Retrain Model</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Model Overview Meta Grid (PDF Section 27) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Version</div>
          <div className="text-xs font-black text-teal-700 font-mono">{activeModel.modelVersion}</div>
          <div className="text-[10px] text-slate-500">{activeModel.algorithm}</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Training Rows</div>
          <div className="text-lg font-black text-slate-900 font-mono">{profile.rowCount.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Active dataset</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</div>
          <div className="text-lg font-black text-emerald-600 font-mono">
            {Math.round(activeModel.accuracy * 100)}%
          </div>
          <div className="text-[10px] text-emerald-700 font-bold">K-Fold Validated</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Precision / Recall</div>
          <div className="text-lg font-black text-slate-900 font-mono">
            {Math.round(activeModel.precision * 100)}% / {Math.round(activeModel.recall * 100)}%
          </div>
          <div className="text-[10px] text-slate-500">Balanced F1: {Math.round(activeModel.f1Score * 100)}%</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ROC-AUC</div>
          <div className="text-lg font-black text-teal-600 font-mono">
            {activeModel.rocAuc.toFixed(3)}
          </div>
          <div className="text-[10px] text-teal-700 font-bold">High Discrimination</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Model Status</div>
          <div className="text-xs font-black text-emerald-700 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Inference
          </div>
          <div className="text-[10px] text-slate-400">{activeModel.trainingDate.slice(0, 10)}</div>
        </div>
      </div>

      {/* Feature Importance & Confusion Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Feature Importance Bar Chart (PDF Section 26) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Feature Importance Weights</h3>
              <p className="text-xs text-slate-500">Parametric contribution to predicted risk classification</p>
            </div>
            <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 font-mono font-bold text-[10px] rounded-lg border border-teal-200">
              Model Derived
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeModel.featureImportances} layout="vertical">
                <XAxis type="number" domain={[0, 0.5]} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="feature" type="category" tick={{ fontSize: 11, fill: '#0F172A', fontWeight: 600 }} width={180} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${Math.round(val * 100)}% Weight`, 'Importance']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                  {activeModel.featureImportances.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#14B8A6' : index === 1 ? '#0D9488' : index === 2 ? '#0F766E' : '#94A3B8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Versioning & Confusion Matrix (PDF Section 28) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Model Version Registry</h3>
              <span className="text-xs text-slate-400 font-mono">{modelsList.length} registered</span>
            </div>

            <div className="space-y-2">
              {modelsList.map((m) => (
                <button
                  key={m.modelVersion}
                  onClick={() => switchActiveModel(m.modelVersion)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    activeModel.modelVersion === m.modelVersion
                      ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500'
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-mono font-bold text-xs text-slate-900">{m.modelVersion}</div>
                    <div className="text-[11px] text-slate-500">{m.algorithm} • Accuracy: {Math.round(m.accuracy * 100)}%</div>
                  </div>
                  {activeModel.modelVersion === m.modelVersion && (
                    <span className="px-2 py-0.5 bg-teal-600 text-white text-[10px] font-bold rounded-md">
                      ACTIVE
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Confusion Matrix Evaluation */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-800 mb-2">Confusion Matrix (Validation Test):</div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">True Negative</div>
                  <div className="text-lg font-black text-slate-800 font-mono mt-0.5">{activeModel.confusionMatrix[0][0]}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">False Positive</div>
                  <div className="text-lg font-black text-slate-800 font-mono mt-0.5">{activeModel.confusionMatrix[0][1]}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">False Negative</div>
                  <div className="text-lg font-black text-slate-800 font-mono mt-0.5">{activeModel.confusionMatrix[1][0]}</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 uppercase font-bold">True Positive</div>
                  <div className="text-lg font-black text-emerald-700 font-mono mt-0.5">{activeModel.confusionMatrix[1][1]}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500">
            Model weights update in real-time when new data files or sensor readings are ingested.
          </div>
        </div>
      </div>
    </div>
  );
};
