import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
function FloatingOrb({ position, color, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroBackground() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#2dd4bf" intensity={0.5} />
      <pointLight position={[10, -10, 5]} color="#5eead4" intensity={0.3} />

      <FloatingOrb
        position={[-3, 0.5, -2]}
        color="#2dd4bf"
        scale={2.5}
      />
      <FloatingOrb
        position={[4, -0.5, -3]}
        color="#5eead4"
        scale={1.8}
      />
      <FloatingOrb
        position={[0, 2, -4]}
        color="#2dd4bf"
        scale={1.2}
      />
    </>
  );
}
