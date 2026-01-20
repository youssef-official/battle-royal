import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Environment } from './components/Game/Environment';
import { Player } from './components/Game/Player';
import { HUD } from './components/UI/HUD';
import { Menu } from './components/UI/Menu';
import { useGameStore } from './store/gameStore';
import { Loader } from '@react-three/drei';

const GameScene = () => {
  const status = useGameStore((state) => state.status);

  if (status === 'lobby') return null;

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Environment />
      <Player />
      {/* Enemies would be mapped here */}
    </Physics>
  );
};

export default function App() {
  const status = useGameStore((state) => state.status);

  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows camera={{ fov: 75 }}>
        <Suspense fallback={null}>
          <GameScene />
        </Suspense>
      </Canvas>
      
      <HUD />
      <Menu />
      <Loader />
      
      {/* Post-processing or global overlays */}
      {status === 'playing' && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      )}
    </div>
  );
}