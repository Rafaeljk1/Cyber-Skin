
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const winRate = user.stats.totalUpgrades > 0 
    ? (user.stats.successfulUpgrades / user.stats.totalUpgrades) * 100 
    : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 p-8 rounded-3xl border border-slate-700">
        <div className="w-32 h-32 bg-sky-500 rounded-full flex items-center justify-center text-4xl font-orbitron font-bold shadow-[0_0_30px_rgba(14,165,233,0.3)]">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-orbitron font-bold uppercase tracking-tighter">{user.username}</h2>
          <p className="text-slate-400 text-sm">ID do Agente: {user.id}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <div className="px-4 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-bold text-sky-400 uppercase tracking-widest">NV. 12</div>
            <div className="px-4 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest">Collector</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border-l-4 border-l-sky-500">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total de Upgrades</p>
          <p className="text-3xl font-orbitron font-bold">{user.stats.totalUpgrades}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Win Rate</p>
          <p className="text-3xl font-orbitron font-bold">{winRate.toFixed(1)}%</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-l-amber-500">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Lucro Total</p>
          <p className={`text-3xl font-orbitron font-bold ${user.stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${user.stats.totalProfit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl space-y-6">
          <h3 className="font-orbitron font-bold text-xl">SOBRE A ECONOMIA</h3>
          <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
            <p>• O sistema de upgrade calcula as chances baseadas no valor dos itens envolvidos.</p>
            <p>• A venda de itens no inventário retorna 80% do valor de mercado original.</p>
            <p>• Itens perdidos em upgrades são removidos permanentemente do sistema.</p>
            <p>• Todas as transações são simuladas com moeda virtual interna.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-sky-600/20 to-purple-600/20 p-8 rounded-3xl border border-sky-500/30 flex flex-col items-center justify-center text-center space-y-4">
           <svg className="w-16 h-16 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <div>
             <h4 className="font-orbitron font-bold text-lg">RECARREGAR SALDO</h4>
             <p className="text-slate-400 text-sm">No momento, as recargas estão desabilitadas na versão de demonstração.</p>
           </div>
           <button disabled className="w-full py-3 bg-slate-800 text-slate-500 rounded-xl font-bold cursor-not-allowed">INDISPONÍVEL</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
