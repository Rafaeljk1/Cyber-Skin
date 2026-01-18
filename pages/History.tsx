
import React from 'react';
import { UpgradeAttempt } from '../types';

interface HistoryProps {
  attempts: UpgradeAttempt[];
}

const History: React.FC<HistoryProps> = ({ attempts }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-orbitron font-bold tracking-tight uppercase">REGISTROS <span className="text-cyan-400">NEURAIS</span></h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Sincronização de atividades recentes</p>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em]">
                <th className="px-5 py-4">Data</th>
                <th className="px-5 py-4">Módulos</th>
                <th className="px-5 py-4">Chance</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {attempts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-20 text-center text-slate-600 font-bold text-[10px] uppercase tracking-widest">Sem logs disponíveis</td>
                </tr>
              ) : (
                attempts.map((attempt) => (
                  <tr key={attempt.id} className="bg-transparent">
                    <td className="px-5 py-5 text-[9px] text-slate-500 font-bold">
                      {new Date(attempt.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-slate-200 line-clamp-1">{attempt.targetItem.name}</p>
                        <p className="text-[8px] text-slate-600 uppercase font-bold tracking-tighter">via {attempt.baseItem.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 font-space font-bold text-[10px] text-cyan-400/80">
                      {attempt.chance.toFixed(0)}%
                    </td>
                    <td className="px-5 py-5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${attempt.result === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {attempt.result === 'SUCCESS' ? 'STABLE' : 'ERROR'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
