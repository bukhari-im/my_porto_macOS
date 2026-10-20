import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import Character3D from './Character3D';

export default function Hero() {
  return (
    <section className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0">
        <Canvas
          camera={{
            position: [0, 1, 6],
            fov: 40,
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[3, 5, 4]}
            intensity={2}
          />

          <Environment preset="studio" />

          <Character3D />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.3}
            scale={5}
            blur={2}
          />
        </Canvas>
      </div>
    </section>
  );
}