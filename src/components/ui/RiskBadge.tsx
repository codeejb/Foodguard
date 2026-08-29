import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, score, size = 'md', showLabel = true }) => {
  const config = {
    LOW: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'LOW RISK',
      scoreText: 'text-emerald-700',
    },
    MEDIUM: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      label: 'MEDIUM RISK',
      scoreText: 'text-amber-700',
    },
    HIGH: {
      bg: 'bg-orange-50 text-orange-700 border-orange-200',
      dot: 'bg-orange-500',
      label: 'HIGH RISK',
      scoreText: 'text-orange-700',
    },
    CRITICAL: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
      label: 'CRITICAL RISK',
      scoreText: 'text-rose-700',
    },
  }[level] || {
    bg: 'bg-slate-50 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    label: 'UNKNOWN',
    scoreText: 'text-slate-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-2.5 py-1 text-xs font-bold rounded-xl gap-2',
    lg: 'px-3.5 py-1.5 text-sm font-extrabold rounded-2xl gap-2.5',
  }[size];

  return (
    <span
      id={`risk-badge-${level.toLowerCase()}-${score || 'generic'}`}
      className={`inline-flex items-center border ${config.bg} ${sizeClasses} tracking-tight whitespace-nowrap`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      {showLabel && <span>{config.label}</span>}
      {score !== undefined && (
        <span className={`font-mono ${config.scoreText}`}>
          ({score}/100)
        </span>
      )}
    </span>
  );
};
