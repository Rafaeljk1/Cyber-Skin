
export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
  MYTHIC = 'Mythic'
}

export interface SkinItem {
  id: string;
  name: string;
  rarity: Rarity;
  value: number;
  category: string;
  image: string;
}

export interface User {
  id: string;
  username: string;
  inventory: SkinItem[];
  balance: number;
  stats: {
    totalUpgrades: number;
    successfulUpgrades: number;
    totalProfit: number;
  };
}

export interface UpgradeAttempt {
  id: string;
  userId: string;
  baseItem: SkinItem;
  targetItem: SkinItem;
  chance: number;
  result: 'SUCCESS' | 'FAILURE';
  timestamp: number;
}

export type AppTab = 'SHOP' | 'INVENTORY' | 'UPGRADE' | 'PROFILE' | 'HISTORY';
