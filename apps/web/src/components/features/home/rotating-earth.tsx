'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Earth() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const texture = useTexture('/textures/earth.jpg')

    useFrame(() => {
        meshRef.current.rotation.y += 0.0015
    })

    return (
        <Sphere args={[3.2, 64, 64]} ref={meshRef}>
            <meshStandardMaterial map={texture} />
        </Sphere>
    )
}

export function RotatingEarth() {
    return (
        <Canvas camera={{ position: [1.8, 0, 6] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 3, 5]} intensity={1} />
            <Earth />
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    )
}
