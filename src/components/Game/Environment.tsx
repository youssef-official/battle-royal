import React from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import { Sky, Stars, useTexture } from '@react-three/drei';

const Building = ({ position, args, color = "#888" }: { position: [number, number, number], args: [number, number, number], color?: string }) => {
  const [ref] = useBox(() => ({ type: 'Static', position, args }));
  return (
    <mesh ref={ref as any} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const Environment = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[100, 100, 100]} castShadow intensity={1} />
      
      <mesh ref={ref as any} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#4a5d23" />
      </mesh>

      {/* Procedural Buildings */}
      <Building position={[10, 2.5, 10]} args={[5, 5, 5]} color="#554433" />
      <Building position={[-15, 4, 20]} args={[8, 8, 8]} color="#444444" />
      <Building position={[25, 3, -15]} args={[6, 6, 12]} color="#334455" />
      <Building position={[-30, 5, -30]} args={[10, 10, 10]} color="#222222" />
      
      {/* Walls/Boundaries */}
      <Building position={[0, 2, 50]} args={[100, 4, 1]} color="#111" />
      <Building position={[0, 2, -50]} args={[100, 4, 1]} color="#111" />
      <Building position={[50, 2, 0]} args={[1, 4, 100]} color="#111" />
      <Building position={[-50, 2, 0]} args={[1, 4, 100]} color="#111" />
    </>
  );
};