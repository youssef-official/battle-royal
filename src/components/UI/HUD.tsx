import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Shield, Heart, Crosshair, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const HUD = () => {
  const { health, ammo, maxAmmo, kills, playersAlive, zoneRadius, isAiming } = useGameStore();

  return (
    <div className="fixed inset-0 pointer-events-none font-display">
      {/* Crosshair */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${isAiming ? 'scale-50' : 'scale-100'}`}>
        <div className="w-1 h-1 bg-red-500 rounded-full" />
        {!isAiming && (
          <>
            <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-[2px] h-3 bg-white/80" />
            <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[2px] h-3 bg-white/80" />
            <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-white/80" />
            <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-white/80" />
          </>
        )}
      </div>

      {/* Top Stats */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-pubg-gold" />
          <span className="font-bold text-xl">{playersAlive}</span>
          <span className="text-xs text-white/60 uppercase tracking-widest">Alive</span>
        </div>
        <div className="w-[1px] h-6 bg-white/20" />
        <div className="flex items-center gap-2">
          <Target size={18} className="text-red-500" />
          <span className="font-bold text-xl">{kills}</span>
          <span className="text-xs text-white/60 uppercase tracking-widest">Kills</span>
        </div>
      </div>

      {/* Bottom Left: Health & Armor */}
      <div className="absolute bottom-10 left-10 w-80">
        <div className="flex gap-2 mb-2">
          <div className="bg-pubg-gold/20 p-2 rounded border border-pubg-gold/50">
            <Shield size={20} className="text-pubg-gold" />
          </div>
          <div className="flex-1 bg-black/40 h-10 rounded border border-white/10 overflow-hidden relative">
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: `${health}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
            />
            <div className="absolute inset-0 flex items-center px-3 justify-between">
              <Heart size={14} className="text-white" />
              <span className="text-sm font-bold">{health} / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right: Weapon & Ammo */}
      <div className="absolute bottom-10 right-10 text-right">
        <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border-t-2 border-pubg-gold/50 min-w-[200px]">
          <div className="text-xs text-pubg-gold font-bold uppercase tracking-[0.2em] mb-1">Assault Rifle</div>
          <div className="text-3xl font-black mb-2 italic">M416</div>
          <div className="flex items-end justify-end gap-2">
            <span className="text-5xl font-black text-white">{ammo}</span>
            <span className="text-2xl font-bold text-white/40 mb-1">/ {maxAmmo}</span>
          </div>
        </div>
      </div>

      {/* Zone Warning */}
      {zoneRadius < 100 && (
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 text-red-500 font-black text-xl uppercase tracking-tighter"
        >
          Zone Shrinking! Get to safety!
        </motion.div>
      )}
    </div>
  );
};