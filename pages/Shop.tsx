
import React, { useState } from 'react';
import { ALL_SKINS } from '../constants.tsx';
import { SkinItem } from '../types.ts';
import SkinCard from '../components/SkinCard.tsx';

interface ShopProps {
  onBuy: (item: SkinItem) => boolean;
  balance: number;
}

const Shop: React.FC<ShopProps> = ({ onBuy, balance }) => {
  const [filter, setFilter] = useState('ALL');

  const filteredSkins = filter === 'ALL' 
    ? ALL_SKINS 
    : ALL_SKINS.filter(s => s.category === filter);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex overflow-x-auto gap-2 hide-scrollbar pb-2">
          {['ALL', 'Pulse', 'Kinetic', 'Blade', 'Sniper'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${filter === cat ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredSkins.map(item => (
          <SkinCard 
            key={item.id} 
            item={item} 
            actionLabel="COMPRAR"
            onAction={() => {
              if (balance >= item.value) onBuy(item);
              else alert('Créditos Insuficientes');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
