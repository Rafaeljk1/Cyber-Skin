
import React, { useState, useEffect } from 'react';
import { User, AppTab, SkinItem, UpgradeAttempt } from './types.ts';
import { ALL_SKINS } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import Shop from './pages/Shop.tsx';
import Inventory from './pages/Inventory.tsx';
import Upgrade from './pages/Upgrade.tsx';
import Profile from './pages/Profile.tsx';
import History from './pages/History.tsx';
import Login from './pages/Login.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('SHOP');
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<UpgradeAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('aether_user');
    const savedHistory = localStorage.getItem('aether_history');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('aether_user', JSON.stringify(user));
    localStorage.setItem('aether_history', JSON.stringify(history));
  }, [user, history]);

  const handleLogin = (username: string) => {
    const starterSkin = ALL_SKINS.find(s => s.id === 'c1') || ALL_SKINS[0];
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      username,
      inventory: [{ ...starterSkin, instanceId: Math.random().toString(36).substr(2, 9) } as any],
      balance: 50.00,
      stats: { totalUpgrades: 0, successfulUpgrades: 0, totalProfit: 0 }
    };
    setUser(newUser);
    setActiveTab('SHOP');
  };

  const buyItem = (item: SkinItem) => {
    if (!user || user.balance < item.value) return false;
    setUser({
      ...user,
      balance: user.balance - item.value,
      inventory: [...user.inventory, { ...item, instanceId: Math.random().toString(36).substr(2, 9) } as any]
    });
    return true;
  };

  const sellItem = (instanceId: string) => {
    if (!user) return;
    const itemIndex = user.inventory.findIndex((s: any) => s.instanceId === instanceId);
    if (itemIndex === -1) return;
    const item = user.inventory[itemIndex];
    const newInventory = [...user.inventory];
    newInventory.splice(itemIndex, 1);
    setUser({ ...user, balance: user.balance + (item.value * 0.75), inventory: newInventory });
  };

  const performUpgrade = (baseInstanceId: string, targetItem: SkinItem, chance: number, forceSuccess?: boolean) => {
    if (!user) return null;
    const baseIndex = user.inventory.findIndex((s: any) => s.instanceId === baseInstanceId);
    if (baseIndex === -1) return null;
    const baseItem = user.inventory[baseIndex];
    
    const isSuccess = forceSuccess ? true : (Math.random() * 100) < chance;
    
    const newInventory = [...user.inventory];
    newInventory.splice(baseIndex, 1);
    
    if (isSuccess) newInventory.push({ ...targetItem, instanceId: Math.random().toString(36).substr(2, 9) } as any);

    const attempt: UpgradeAttempt = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      userId: user.id,
      baseItem,
      targetItem,
      chance: forceSuccess ? 100 : chance,
      result: isSuccess ? 'SUCCESS' : 'FAILURE',
      timestamp: Date.now()
    };

    setHistory([attempt, ...history].slice(0, 30));
    setUser({
      ...user,
      inventory: newInventory,
      stats: {
        totalUpgrades: user.stats.totalUpgrades + 1,
        successfulUpgrades: user.stats.successfulUpgrades + (isSuccess ? 1 : 0),
        totalProfit: user.stats.totalProfit + (isSuccess ? targetItem.value - baseItem.value : -baseItem.value)
      }
    });
    return attempt;
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-space uppercase tracking-[0.3em] text-xs">Aether Link...</div>;
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-black shadow-2xl relative">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} balance={user.balance} username={user.username} />
      
      <main className="flex-grow overflow-y-auto px-4 py-4 mb-20">
        {activeTab === 'SHOP' && <Shop onBuy={buyItem} balance={user.balance} />}
        {activeTab === 'INVENTORY' && <Inventory inventory={user.inventory} onSell={sellItem} />}
        {activeTab === 'UPGRADE' && <Upgrade inventory={user.inventory} onUpgrade={performUpgrade} />}
        {activeTab === 'PROFILE' && <Profile user={user} />}
        {activeTab === 'HISTORY' && <History attempts={history} />}
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-white/5 flex justify-around items-center h-16 z-50">
        {[
          { id: 'SHOP', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
          { id: 'INVENTORY', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
          { id: 'UPGRADE', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
          { id: 'HISTORY', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AppTab)} 
            className={`flex flex-col items-center justify-center w-full h-full transition-all ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
            </svg>
            <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">{tab.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
