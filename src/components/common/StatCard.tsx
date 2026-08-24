import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle: string;
  subtitleColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  subtitleColor = 'text-slate-500',
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</div>
      <div className="text-2xl font-extrabold text-slate-900 mt-2 truncate">
        {value} {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
      </div>
      <div className={`text-xs font-semibold mt-1 ${subtitleColor}`}>{subtitle}</div>
    </div>
  );
};
