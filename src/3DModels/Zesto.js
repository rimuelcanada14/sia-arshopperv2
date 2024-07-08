import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelBuilder from './ModelBuilder.js';

const Zesto = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Canvas style={{ height: '50vh', width: '50vw' }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} />
        <ModelBuilder path="/ZestoPineApple.glb" />
        <OrbitControls
          enableZoom={true}
          minDistance={4}
          maxDistance={6}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

export default Zesto;