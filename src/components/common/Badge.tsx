import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'blue' | 'amber' | 'purple' | 'red' | 'emerald' | 'slate';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'slate' }) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]}`}>
      {label}
    </span>
  );
};
