
import React from 'react';
import { AppTab } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  balance: number;
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ balance, username, setActiveTab }) => {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/5 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2" onClick={() => setActiveTab('SHOP')}>
        <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
          </svg>
        </div>
        <span className="font-space font-bold text-lg tracking-tight">AETHER<span className="text-cyan-400">FORGE</span></span>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-space font-bold text-sm">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div 
          onClick={() => setActiveTab('PROFILE')}
          className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold uppercase cursor-pointer"
        >
          {username.charAt(0)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
