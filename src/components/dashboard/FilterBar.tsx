import React from 'react';
import { FilterOptions } from '../../interfaces';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="w-full md:w-72">
        <input
          type="text"
          placeholder="Konu veya notlarda ara..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
          className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
        <select
          value={filters.selectedSubject}
          onChange={(e) => onFilterChange({ selectedSubject: e.target.value })}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="ALL">Tüm Dersler</option>
          <option value="Yazılım">Yazılım</option>
          <option value="Matematik">Matematik</option>
          <option value="Fizik">Fizik</option>
          <option value="Siber Güvenlik">Siber Güvenlik</option>
          <option value="Veri Bilimi">Veri Bilimi</option>
          <option value="Diğer">Diğer</option>
        </select>

        <select
          value={`${filters.sortBy}_${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('_');
            onFilterChange({ sortBy: sortBy as any, sortOrder: sortOrder as any });
          }}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="date_desc">Yeniden Eskiye</option>
          <option value="date_asc">Eskiden Yeniye</option>
          <option value="durationMinutes_desc">En Uzun Süre</option>
          <option value="durationMinutes_asc">En Kısa Süre</option>
        </select>
      </div>
    </div>
  );
};
