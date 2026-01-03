// 'use client'
//
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Sphere, OrbitControls, useTexture } from '@react-three/drei'
// import { useRef } from 'react'
// import * as THREE from 'three'
//
// // function Earth() {
// //     const meshRef = useRef<THREE.Mesh>(null!)
// //     const texture = useTexture('/textures/earth.jpg')
// //
// //     useFrame(() => {
// //         meshRef.current.rotation.y += 0.0015
// //     })
// //
// //     return (
// //         <Sphere args={[3.2, 64, 64]} ref={meshRef}>
// //             <meshStandardMaterial map={texture} />
// //         </Sphere>
// //     )
// // }
//
// function Earth() {
//     const earthRef = useRef<THREE.Mesh>(null);
//
//     useFrame(({ clock }) => {
//         if (earthRef.current) {
//             earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
//         }
//     });
//
//     return (
//         <mesh ref={earthRef} scale={2.5}>
//             <sphereGeometry args={[1, 32, 32]} />
//             <meshStandardMaterial color="#4f46e5" wireframe={true} />
//         </mesh>
//     );
// }
//
// export function RotatingEarth() {
//     return (
//         <Canvas
//             camera={{ position: [0, 0, 5], fov: 45 }}
//             dpr={[1, 1.5]}
//             gl={{
//                 powerPreference: "high-performance",
//                 antialias: false,
//                 preserveDrawingBuffer: false
//             }}
//         />
//     )
// }
