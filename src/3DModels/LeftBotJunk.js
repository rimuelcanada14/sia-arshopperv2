import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelBuilder from './ModelBuilder.js';

const CokeCom = () => {

  return (
    <div className="loc-modal-content">
    <div className="canvas-container">
      <Canvas style={{ height: '100vh', width: '100%', zIndex: '10', marginTop: '-10em'}}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} />
        
          <ModelBuilder path="/LeftBotJunk.glb" position={[0, 0, -5]} />
      
        <OrbitControls
          enableZoom={true}
          minDistance={130}
          maxDistance={140}
          enablePan={true}
        />
      </Canvas>
    </div>
  </div>
  );
};

export default CokeCom;

