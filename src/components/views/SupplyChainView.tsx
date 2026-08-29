import React, { useState } from 'react';
import {
  Network,
  Building2,
  Factory,
  Truck,
  Store,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../ui/RiskBadge';
import { ResponsibleAiBanner } from '../ui/ResponsibleAiBanner';
import { SupplyChainNode } from '../../types';

export const SupplyChainView: React.FC = () => {
  const { supplyChainNodes, supplyChainEdges, setActiveTab, setSelectedBatchId } = useApp();
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode>(supplyChainNodes[6]); // Narela Cold Logistics

  const tiers: ('Supplier' | 'Factory' | 'Warehouse' | 'Distributor' | 'Retailer')[] = [
    'Supplier',
    'Factory',
    'Warehouse',
    'Distributor',
    'Retailer',
  ];

  const getTierIcon = (type: SupplyChainNode['type']) => {
    switch (type) {
      case 'Supplier':
        return Building2;
      case 'Factory':
        return Factory;
      case 'Warehouse':
        return Building2;
      case 'Distributor':
        return Truck;
      case 'Retailer':
        return Store;
    }
  };

  return (
    <div id="supply-chain-graph-view" className="space-y-6 animate-in fade-in duration-300">
      <ResponsibleAiBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Network className="w-5 h-5 text-teal-600" />
            <span>Interactive Supply-Chain Network Topology</span>
          </h2>
          <p className="text-xs text-slate-500">
            Node-link relationship graph mapped from primary agricultural origin through processing and cold storage to point-of-sale
          </p>
        </div>
      </div>

      {/* Network Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tier Columns Topology */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Custody Tier Layout</h3>
            <span className="text-xs text-slate-400 font-mono">15 Registered Entities</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {tiers.map((tierName) => {
              const nodesInTier = supplyChainNodes.filter((n) => n.type === tierName);
              return (
                <div key={tierName} className="space-y-2.5">
                  <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider text-center border-b border-slate-100 pb-2">
                    {tierName}
                  </div>

                  <div className="space-y-2">
                    {nodesInTier.map((node) => {
                      const Icon = getTierIcon(node.type);
                      const isSelected = selectedNode?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          id={`node-${node.id}`}
                          onClick={() => setSelectedNode(node)}
                          className={`w-full p-3 rounded-2xl border text-left transition-all relative ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                              : 'bg-slate-50/70 border-slate-200/70 hover:bg-white hover:border-teal-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="w-6 h-6 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-700">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                node.risk_level === 'CRITICAL'
                                  ? 'bg-rose-500 animate-ping'
                                  : node.risk_level === 'HIGH'
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                            />
                          </div>

                          <div className="font-black text-xs text-slate-900 line-clamp-1">{node.name}</div>
                          <div className="text-[10px] text-slate-500 truncate">{node.area}</div>

                          <div className="mt-2 pt-1 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400">Batches:</span>
                            <span className="font-mono font-bold text-slate-700">{node.active_batches}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Entity Node Inspector Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    {selectedNode.id} • {selectedNode.type}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">{selectedNode.name}</h3>
                  <div className="text-xs text-slate-500">{selectedNode.area}</div>
                </div>
                <RiskBadge level={selectedNode.risk_level} />
              </div>

              {/* Node Telemetry */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Average Temp</div>
                  <div className="text-base font-black text-slate-900 font-mono mt-0.5">
                    {selectedNode.temp_avg}°C
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Active Inventory</div>
                  <div className="text-base font-black text-slate-900 font-mono mt-0.5">
                    {selectedNode.active_batches} batches
                  </div>
                </div>
              </div>

              {/* Connected Transport Links */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">Connected Logistics Channels:</div>
                <div className="space-y-1.5 text-xs">
                  {supplyChainEdges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Truck className="w-3.5 h-3.5 text-teal-600" />
                          <span className="font-mono text-[11px] text-slate-700">
                            {edge.from} → {edge.to}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            edge.status === 'Thermal Spike Detected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {edge.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select any node in the topology graph to view connected logistics flow
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Simulate Node Quarantine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
