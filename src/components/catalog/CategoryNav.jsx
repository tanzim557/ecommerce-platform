import React from 'react';
import { CATEGORIES } from '../../data/products';
import { Sparkles, Laptop, Headphones, Shirt, Footprints, Lamp } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Laptop,
  Headphones,
  Shirt,
  Footprints,
  Lamp,
};

export default function CategoryNav({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-zinc-200">
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Sparkles;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 shadow-2xs'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
