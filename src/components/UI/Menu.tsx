import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';
import { Play, Settings, Trophy, LogOut } from 'lucide-react';

export const Menu = () => {
  const startGame = useGameStore((state) => state.startGame);
  const status = useGameStore((state) => state.status);

  if (status !== 'lobby' && status !== 'gameover' && status !== 'victory') return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div className="max-w-4xl w-full p-12 flex flex-col items-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 text-center"
        >
          <h1 className="text-8xl font-black italic tracking-tighter text-white mb-2">
            BATTLE<span className="text-pubg-gold">X</span>
          </h1>
          <p className="text-pubg-gold font-bold tracking-[0.5em] uppercase">The Ultimate Web Royale</p>
        </motion.div>

        {status === 'gameover' && (
          <div className="mb-8 text-red-500 text-3xl font-black uppercase tracking-widest">Eliminated</div>
        )}
        {status === 'victory' && (
          <div className="mb-8 text-pubg-gold text-4xl font-black uppercase tracking-widest animate-bounce">
            Winner Winner Chicken Dinner!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <button 
            onClick={startGame}
            className="group relative overflow-hidden bg-pubg-gold p-6 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative z-10 flex items-center justify-center gap-3 text-black font-black text-2xl uppercase">
              <Play fill="black" /> Start Match
            </div>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>

          <button className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-xl uppercase">
            <Settings /> Settings
          </button>

          <button className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-xl uppercase">
            <Trophy /> Leaderboard
          </button>

          <button className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-xl uppercase">
            <LogOut /> Exit Game
          </button>
        </div>

        <div className="mt-16 text-white/30 text-sm uppercase tracking-widest">
          v1.0.4-alpha • Powered by BattleEngine
        </div>
      </div>
    </div>
  );
};