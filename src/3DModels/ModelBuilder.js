import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ModelBuilder = ({ path, ...props }) => {
  const { scene, animations } = useGLTF(path);

  const mixer = useRef();

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return scene ? <primitive object={scene} {...props} /> : null;
};

export default ModelBuilder;
