import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelBuilder from './ModelBuilder.js';

const ModelThree = () => {
  return (
    <div className="loc-modal-content">
        <Canvas
          camera={{ position: [0, 5, 0], up: [0, 0, -1], near: 0.1, far: 1000 }}
          style={{ height: '50vh', width: '100%', zIndex: '1', marginTop: '0em' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} />
          
          <ModelBuilder path="/ModelThree.glb" position={[3, -6, -30]} />
          
          <OrbitControls
            enableZoom={true}
            minDistance={60}
            maxDistance={70}
            enablePan={true}
            target={[0, 0, 0]}  // Focus on the center of the model
            maxPolarAngle={Math.PI / 2}  // Limit vertical rotation to top-down view
          />
        </Canvas>
    </div>
  );
};

export default ModelThree;
