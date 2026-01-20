import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { PointerLockControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameStore } from '../../store/gameStore';

const SPEED = 5;
const SPRINT_SPEED = 9;

export const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint } = useKeyboard();
  const { camera } = useThree();
  const shoot = useGameStore((state) => state.shoot);
  const ammo = useGameStore((state) => state.ammo);
  const setAiming = useGameStore((state) => state.setAiming);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5, 0],
    args: [0.6],
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => api.position.subscribe((p) => (pos.current = p)), [api.position]);

  useFrame(() => {
    if (!ref.current) return;

    camera.position.copy(new THREE.Vector3(pos.current[0], pos.current[1] + 0.75, pos.current[2]));

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, Number(moveBackward) - Number(moveForward));
    const sideVector = new THREE.Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(sprint ? SPRINT_SPEED : SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 4, velocity.current[2]);
    }
  });

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button === 0 && ammo > 0) {
      shoot();
      // Raycast logic for shooting would go here
    }
    if (e.button === 2) {
      setAiming(true);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (e.button === 2) {
      setAiming(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ammo]);

  return (
    <>
      <PointerLockControls />
      <mesh ref={ref as any} />
    </>
  );
};