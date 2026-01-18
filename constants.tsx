
import { Rarity, SkinItem } from './types.ts';

export const ALL_SKINS: SkinItem[] = [
  // COMMON
  { id: 'c1', name: 'Vanguarda Hexagonal', rarity: Rarity.COMMON, value: 0.5, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=300&q=80' },
  { id: 'c2', name: 'Satélite Retrô', rarity: Rarity.COMMON, value: 0.8, category: 'Pulse', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=300&q=80' },
  { id: 'c3', name: 'Lâmina de Obsidiana', rarity: Rarity.COMMON, value: 1.2, category: 'Blade', image: 'https://images.unsplash.com/photo-1599408162162-67ae2918e406?auto=format&fit=crop&w=300&q=80' },
  { id: 'c4', name: 'Engrenagem Oxidada', rarity: Rarity.COMMON, value: 0.3, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=300&q=80' },

  // RARE
  { id: 'r1', name: 'Circuito Sobrecarregado', rarity: Rarity.RARE, value: 12.0, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80' },
  { id: 'r2', name: 'Operação Ártica', rarity: Rarity.RARE, value: 15.0, category: 'Pulse', image: 'https://images.unsplash.com/photo-1517495306984-f8421c6b3ec7?auto=format&fit=crop&w=300&q=80' },
  { id: 'r3', name: 'Vapor de Titânio', rarity: Rarity.RARE, value: 18.5, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1516339901600-2e1a62dc0c45?auto=format&fit=crop&w=300&q=80' },
  { id: 'r4', name: 'Pulso Galáctico', rarity: Rarity.RARE, value: 22.0, category: 'Pulse', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=300&q=80' },
  { id: 'r5', name: 'Eco Sônico', rarity: Rarity.RARE, value: 25.0, category: 'Pulse', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80' },

  // EPIC
  { id: 'e1', name: 'Prisma de Lítio', rarity: Rarity.EPIC, value: 85.0, category: 'Pulse', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=300&q=80' },
  { id: 'e2', name: 'Glitch no Sistema', rarity: Rarity.EPIC, value: 110.0, category: 'Pulse', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80' },
  { id: 'e3', name: 'Cortex Noturno', rarity: Rarity.EPIC, value: 145.0, category: 'Blade', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80' },
  { id: 'e4', name: 'Gato de Schrödinger', rarity: Rarity.EPIC, value: 190.0, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80' },
  { id: 'e5', name: 'Protocolo Neon', rarity: Rarity.EPIC, value: 220.0, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=300&q=80' },

  // LEGENDARY
  { id: 'l1', name: 'Oráculo de Âmbar', rarity: Rarity.LEGENDARY, value: 650.0, category: 'Blade', image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=300&q=80' },
  { id: 'l2', name: 'Banana Tática', rarity: Rarity.LEGENDARY, value: 820.0, category: 'Pulse', image: 'https://images.unsplash.com/photo-1528825831138-d73644ced4fe?auto=format&fit=crop&w=300&q=80' },
  { id: 'l3', name: 'Mármore Divino', rarity: Rarity.LEGENDARY, value: 980.0, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1531685250784-753e0cd244b2?auto=format&fit=crop&w=300&q=80' },
  { id: 'l4', name: 'Sentinela Arcano', rarity: Rarity.LEGENDARY, value: 1150.0, category: 'Sniper', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b477?auto=format&fit=crop&w=300&q=80' },

  // MYTHIC
  { id: 'm1', name: 'Relâmpago Dracônico', rarity: Rarity.MYTHIC, value: 2800.0, category: 'Kinetic', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=300&q=80' },
  { id: 'm2', name: 'Sopro do Vazio', rarity: Rarity.MYTHIC, value: 3500.0, category: 'Sniper', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80' },
  { id: 'm3', name: 'Asa da Fênix', rarity: Rarity.MYTHIC, value: 4200.0, category: 'Blade', image: 'https://images.unsplash.com/photo-1533331639-74f1863c7b3c?auto=format&fit=crop&w=300&q=80' },
  { id: 'm4', name: 'Chronos Shard', rarity: Rarity.MYTHIC, value: 5800.0, category: 'Blade', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80' },
  { id: 'm5', name: 'Singularity Edge', rarity: Rarity.MYTHIC, value: 8500.0, category: 'Blade', image: 'https://images.unsplash.com/photo-1614728263952-84ea206f9c41?auto=format&fit=crop&w=300&q=80' },
];

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.COMMON]: 'border-slate-500',
  [Rarity.RARE]: 'border-blue-500',
  [Rarity.EPIC]: 'border-purple-500',
  [Rarity.LEGENDARY]: 'border-orange-500',
  [Rarity.MYTHIC]: 'border-red-500',
};

export const RARITY_GRADIENTS: Record<Rarity, string> = {
  [Rarity.COMMON]: 'from-slate-500/20',
  [Rarity.RARE]: 'from-blue-500/20',
  [Rarity.EPIC]: 'from-purple-500/20',
  [Rarity.LEGENDARY]: 'from-orange-500/20',
  [Rarity.MYTHIC]: 'from-red-500/20',
};
