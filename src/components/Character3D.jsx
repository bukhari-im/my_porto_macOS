import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Character3D() {
    const { scene } = useGLTF("/public/Hero_Karakter.glb");

    const character = useRef();

    useFrame((state) => {
        if(!character.current) return;

        const time = state.clock.getElapsedTime();

        //gerakan naik turun sangat kecil.

        character.current.position.y = 
        Math.sin(time * 1.2) * 0.025;
        
        //gerakan badan kiri-kanan

        character.current.rotation.y =
        Math.sin(time * 0.5) * 0.03;

        //mengikuti posisi mouse

        const mouseX = state.pointer.x;
        const mouseY = state.pointer.y;

        character.current.rotation.y += mouseX * Math.PI;
        character.current.rotation.x = mouseY * 0.025;
    });
     return (
        <primitive
        ref={character}
        object={scene}
        scale={0.8}
        position={[-4.5, 5, -1]}
        />
     )
}

useGLTF.preload("/public/Hero_Karakter.glb");