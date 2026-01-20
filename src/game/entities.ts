// This file would contain logic for spawning loot and enemies
export interface Entity {
  id: string;
  type: 'player' | 'bot' | 'loot';
  position: [number, number, number];
  health?: number;
}

export const spawnBots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `bot-${i}`,
    type: 'bot',
    position: [(Math.random() - 0.5) * 80, 2, (Math.random() - 0.5) * 80],
    health: 100
  }));
};