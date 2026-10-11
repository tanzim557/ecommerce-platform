import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function FilterBar({
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  totalResults,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
      {/* Result Count and Quick Toggles */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-xs font-medium text-zinc-500">
          Showing <strong className="text-zinc-900 font-bold">{totalResults}</strong> curated items
        </span>

        {/* In-stock toggle */}
        <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs hover:border-zinc-300 transition">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Sorting & Max Price Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Max Price Filter */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs text-xs text-zinc-700">
          <span className="text-zinc-500 font-medium">Max:</span>
          <span className="text-zinc-900 font-bold">${maxPrice}</span>
          <input
            type="range"
            min="100"
            max="800"
            step="25"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24 accent-zinc-900 cursor-pointer"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs text-xs text-zinc-700">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-zinc-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-zinc-900 font-bold focus:outline-none cursor-pointer"
          >
            <option value="featured" className="bg-white text-zinc-900">Recommended</option>
            <option value="price_asc" className="bg-white text-zinc-900">Price: Low to High</option>
            <option value="price_desc" className="bg-white text-zinc-900">Price: High to Low</option>
            <option value="rating" className="bg-white text-zinc-900">Highest Rated</option>
            <option value="newest" className="bg-white text-zinc-900">Newest First</option>
          </select>
        </div>
      </div>
    </div>
  );
}
