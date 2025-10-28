import {  Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Loader() {
    const { progress } = useProgress()
    console.log(progress)
    return <Html center>{progress} % loaded</Html>
}


const SceneHome = () => {
    const gltf = useLoader(GLTFLoader, '../public/modelosP/villa.glb')

    return (
        <Suspense fallback={<Loader />}>
        <Canvas className='w-1/2 h-full' camera={{ position: [-0.5, 1, 2] }} shadows >
            <ambientLight intensity={10} />
            <primitive
            object={gltf.scene}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            children-0-castShadow
            />
            <OrbitControls target={[0, 1, 0]}   minDistance={2}
            maxDistance={10} />
            {/* <Stats /> */}
        </Canvas>
        </Suspense>
    );
};

export default SceneHome;