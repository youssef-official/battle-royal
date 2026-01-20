import { create } from 'zustand';

interface GameState {
  status: 'lobby' | 'playing' | 'gameover' | 'victory';
  health: number;
  ammo: number;
  maxAmmo: number;
  kills: number;
  playersAlive: number;
  zoneRadius: number;
  inventory: string[];
  isAiming: boolean;
  
  startGame: () => void;
  takeDamage: (amount: number) => void;
  addKill: () => void;
  shoot: () => void;
  reload: () => void;
  setAiming: (aiming: boolean) => void;
  updateZone: (delta: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  status: 'lobby',
  health: 100,
  ammo: 30,
  maxAmmo: 30,
  kills: 0,
  playersAlive: 100,
  zoneRadius: 500,
  inventory: ['M416', 'First Aid Kit'],
  isAiming: false,

  startGame: () => set({ status: 'playing', health: 100, kills: 0, playersAlive: 100, zoneRadius: 500 }),
  
  takeDamage: (amount) => set((state) => {
    const newHealth = Math.max(0, state.health - amount);
    return { 
      health: newHealth,
      status: newHealth <= 0 ? 'gameover' : state.status 
    };
  }),

  addKill: () => set((state) => ({ 
    kills: state.kills + 1,
    playersAlive: Math.max(1, state.playersAlive - 1),
    status: state.playersAlive - 1 === 1 ? 'victory' : state.status
  })),

  shoot: () => set((state) => ({
    ammo: state.ammo > 0 ? state.ammo - 1 : 0
  })),

  reload: () => set((state) => ({ ammo: state.maxAmmo })),

  setAiming: (isAiming) => set({ isAiming }),

  updateZone: (delta) => set((state) => ({
    zoneRadius: Math.max(10, state.zoneRadius - delta * 0.5)
  })),

  resetGame: () => set({ status: 'lobby', health: 100, ammo: 30, kills: 0, playersAlive: 100 })
}));