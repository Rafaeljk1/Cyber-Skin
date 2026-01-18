
import React from 'react';
import { SkinItem, Rarity } from '../types.ts';
import { RARITY_COLORS, RARITY_GRADIENTS } from '../constants.tsx';

interface SkinCardProps {
  item: SkinItem;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  isSelected?: boolean;
  compact?: boolean;
}

const SkinCard: React.FC<SkinCardProps> = ({ item, onClick, actionLabel, onAction, isSelected, compact }) => {
  if (!item) return null;

  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 rounded-2xl border overflow-hidden flex flex-col
        ${RARITY_COLORS[item.rarity] || 'border-slate-500'} 
        ${isSelected ? 'scale-[1.03] shadow-[0_0_20px_rgba(0,242,255,0.2)] bg-slate-900' : 'bg-slate-900/40 hover:bg-slate-900/60'}
        ${compact ? 'h-32' : 'h-full'}
      `}
    >
      <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-bold uppercase rounded bg-black/60 text-white z-10 border border-white/10`}>
        {item.rarity}
      </div>
      
      <div className={`relative flex-shrink-0 bg-gradient-to-br ${RARITY_GRADIENTS[item.rarity] || 'from-slate-500/20'} to-transparent flex items-center justify-center overflow-hidden
        ${compact ? 'h-20' : 'aspect-[4/3] p-4'}
      `}>
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover mix-blend-lighten group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-3 flex flex-col flex-grow justify-between gap-1">
        <div>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.category}</p>
          <h3 className={`font-bold text-slate-100 leading-tight line-clamp-1 ${compact ? 'text-xs' : 'text-sm'}`}>{item.name}</h3>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <span className="text-cyan-400 font-space font-bold text-xs">
            ${(item.value || 0).toFixed(2)}
          </span>
          {onAction && !compact && (
            <button 
              onClick={(e) => { e.stopPropagation(); onAction(); }}
              className="px-2.5 py-1 bg-white/5 hover:bg-cyan-500 hover:text-black text-[10px] font-bold rounded-lg border border-white/10 transition-all"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinCard;
