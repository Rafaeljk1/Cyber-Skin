
import React, { useState, useMemo, useRef } from 'react';
import { SkinItem, UpgradeAttempt } from '../types.ts';
import { ALL_SKINS } from '../constants.tsx';
import SkinCard from '../components/SkinCard.tsx';

interface UpgradeProps {
  inventory: SkinItem[];
  onUpgrade: (baseInstanceId: string, targetItem: SkinItem, chance: number, forceSuccess?: boolean) => UpgradeAttempt | null;
}

const Upgrade: React.FC<UpgradeProps> = ({ inventory, onUpgrade }) => {
  const [baseItem, setBaseItem] = useState<any | null>(null);
  const [targetItem, setTargetItem] = useState<SkinItem | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [bypassActive, setBypassActive] = useState(false);
  const [result, setResult] = useState<UpgradeAttempt | null>(null);
  const [showModal, setShowModal] = useState<'BASE' | 'TARGET' | null>(null);
  
  const forceSuccessRef = useRef(false);

  const upgradeChance = useMemo(() => {
    if (!baseItem || !targetItem) return 0;
    const chance = (baseItem.value / targetItem.value) * 100;
    return Math.min(95, Math.max(5, chance));
  }, [baseItem, targetItem]);

  const handleUpgrade = async () => {
    if (!baseItem || !targetItem || isUpgrading) return;
    
    setIsUpgrading(true);
    setBypassActive(false);
    forceSuccessRef.current = false;
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const attempt = onUpgrade(baseItem.instanceId, targetItem, upgradeChance, forceSuccessRef.current);
    
    setResult(attempt);
    setIsUpgrading(false);
    
    if (attempt?.result === 'FAILURE') {
      setBaseItem(null);
    }
  };

  const handleHiddenBypass = () => {
    if (isUpgrading && !forceSuccessRef.current) {
      forceSuccessRef.current = true;
      setBypassActive(true);
    }
  };

  const SelectionModal = ({ type }: { type: 'BASE' | 'TARGET' }) => {
    const list = type === 'BASE' ? inventory : ALL_SKINS.filter(s => baseItem ? s.value > baseItem.value : true).sort((a, b) => a.value - b.value);
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900">
          <h3 className="font-space font-bold text-sm uppercase tracking-widest">{type === 'BASE' ? 'Item Base' : 'Item Alvo'}</h3>
          <button onClick={() => setShowModal(null)} className="p-2 text-slate-400 text-2xl">&times;</button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 grid grid-cols-2 gap-3 pb-24">
          {list.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-slate-500">Nenhum item disponível</div>
          ) : (
            list.map((item: any) => (
              <SkinCard 
                key={item.instanceId || item.id} 
                item={item} 
                onClick={() => {
                  if (type === 'BASE') { setBaseItem(item); setTargetItem(null); }
                  else setTargetItem(item);
                  setShowModal(null);
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 py-2">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-space font-bold tracking-tight">FORJAR <span className="text-cyan-400">UPGRADE</span></h2>
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Selecione os módulos para iniciar.</p>
      </div>

      <div className="flex flex-col gap-6 items-center px-4">
        <div className="w-full flex justify-between items-center gap-2 relative">
          <div className="flex-1 max-w-[130px]">
            {baseItem ? (
              <div className="relative animate-in zoom-in duration-300">
                <SkinCard item={baseItem} compact />
                <button 
                  onClick={() => !isUpgrading && setBaseItem(null)} 
                  disabled={isUpgrading}
                  className={`absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-20 ${isUpgrading ? 'opacity-0' : 'opacity-100'}`}
                >
                  &times;
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowModal('BASE')}
                className="w-full h-32 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-600 hover:text-cyan-500 hover:border-cyan-500/50 transition-all bg-white/5"
              >
                <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center mb-2">+</div>
                <span className="text-[10px] font-bold uppercase">Base</span>
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
             <div 
              onClick={handleHiddenBypass}
              className={`
                w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500
                ${isUpgrading ? (bypassActive ? 'border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.5)]' : 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]') : 'border-slate-800 bg-black/40'}
              `}
             >
                {isUpgrading && (
                  <>
                    <div className={`absolute inset-0 border-t-2 ${bypassActive ? 'border-emerald-400' : 'border-cyan-400'} animate-spin`} />
                    <div className="absolute inset-2 border-r-2 border-white/5 animate-[spin_1.5s_linear_infinite_reverse]" />
                  </>
                )}
                
                <div className="text-center z-10">
                  <span className={`font-space font-bold text-xl transition-colors duration-500 ${isUpgrading ? (bypassActive ? 'text-emerald-400' : 'text-cyan-400') : 'text-slate-600'}`}>
                    {upgradeChance.toFixed(0)}%
                  </span>
                  <div className={`text-[7px] font-bold uppercase tracking-tighter transition-opacity ${isUpgrading ? 'opacity-100' : 'opacity-0'}`}>
                    {bypassActive ? 'LINK SECURE' : 'SYNCING'}
                  </div>
                </div>
             </div>
             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest text-center">Protocolo</p>
          </div>

          <div className="flex-1 max-w-[130px]">
            {targetItem ? (
              <div className="relative animate-in zoom-in duration-300">
                <SkinCard item={targetItem} compact />
                <button 
                  onClick={() => !isUpgrading && setTargetItem(null)}
                  disabled={isUpgrading}
                  className={`absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-20 ${isUpgrading ? 'opacity-0' : 'opacity-100'}`}
                >
                  &times;
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowModal('TARGET')}
                className="w-full h-32 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-600 hover:text-cyan-500 hover:border-cyan-500/50 transition-all bg-white/5"
              >
                <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center mb-2">+</div>
                <span className="text-[10px] font-bold uppercase">Alvo</span>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={!baseItem || !targetItem || isUpgrading}
          className={`
            w-full max-w-sm py-4 rounded-2xl font-space font-bold text-sm tracking-widest transition-all
            ${!baseItem || !targetItem || isUpgrading 
              ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed' 
              : 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95'}
          `}
        >
          {isUpgrading ? 'FORJANDO MÓDULO...' : 'INICIAR UPGRADE'}
        </button>
      </div>

      {result && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 animate-in fade-in duration-500">
          <div className="text-center space-y-8 w-full max-w-xs">
            <h2 className={`text-5xl font-space font-bold tracking-tighter animate-bounce ${result.result === 'SUCCESS' ? 'text-emerald-400' : 'text-red-500'}`}>
              {result.result === 'SUCCESS' ? 'ESTÁVEL' : 'GLITCH'}
            </h2>
            
            <div className={`p-6 rounded-3xl glass border-2 flex flex-col items-center justify-center h-72 overflow-hidden transition-all duration-700 ${result.result === 'SUCCESS' ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-red-500/50 bg-red-950/10'}`}>
               {result.result === 'SUCCESS' ? (
                 <div className="space-y-4 animate-in zoom-in fade-in duration-700 w-full">
                   <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest">Sobrescrita Completa</p>
                   <SkinCard item={result.targetItem} />
                 </div>
               ) : (
                 <div className="space-y-4 opacity-50 grayscale w-full">
                   <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest">Protocolo Falhou</p>
                   <SkinCard item={result.baseItem} />
                 </div>
               )}
            </div>

            <button 
              onClick={() => { setResult(null); if (result.result === 'SUCCESS') setTargetItem(null); }}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${result.result === 'SUCCESS' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-white text-black'}`}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {showModal && <SelectionModal type={showModal} />}
    </div>
  );
};

export default Upgrade;
