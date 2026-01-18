
import React from 'react';
import { SkinItem } from '../types.ts';
import SkinCard from '../components/SkinCard.tsx';

interface InventoryProps {
  inventory: SkinItem[];
  onSell: (instanceId: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, onSell }) => {
  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-space font-bold tracking-tight uppercase">ACERVO <span className="text-cyan-400">NEURAL</span></h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{inventory.length} Módulos Ativos</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Patrimônio</p>
          <p className="text-lg font-space text-emerald-400 font-bold tracking-tight">${totalValue.toFixed(2)}</p>
        </div>
      </div>

      {inventory.length === 0 ? (
        <div className="bg-slate-900/30 border border-dashed border-white/10 rounded-3xl py-16 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Acervo Vazio</p>
          <p className="text-slate-600 text-[10px] mt-2">Visite a loja para adquirir novos módulos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-8">
          {inventory.map((item: any) => (
            <SkinCard 
              key={item.instanceId} 
              item={item} 
              actionLabel="VENDER (75%)"
              onAction={() => onSell(item.instanceId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
