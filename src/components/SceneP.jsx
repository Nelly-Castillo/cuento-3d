import { useEffect, useRef, Suspense } from 'react'; // Necesario para SceneModel
import { useGLTF, useProgress, Html, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';


function Loader() {
    const { progress } = useProgress()
    // console.log(progress)
    return <Html center>{progress.toFixed(0)} % loaded</Html>
}

function SceneModel({ modelPath }) {
    if (!modelPath || typeof modelPath !== 'string' || modelPath.length === 0) {
        // Podrías devolver un objeto placeholder o simplemente null.
        return null; 
    }
    const { scene, animations } = useGLTF(modelPath);
    const group = useRef();
    const mixer = useRef();

    useEffect(() => {
        if (scene && animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene); 
            const action = mixer.current.clipAction(animations[0]); 
            action.play();
        }else {
        // Si no hay animaciones, asegúrate de que el mixer no intente actualizarse
        mixer.current = null;
    }
    }, [scene, animations]);

    useFrame((_, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return (
        <primitive 
            ref={group} 
            object={scene} 
            scale={1} 
            position={[0, -1, 0]} 
            castShadow 
            receiveShadow 
        />
    );

}


const SceneP = ({ modelPath, pageKey }) => {
    if (!modelPath) return null;
    return (
        <Canvas className='w-screen h-sreen' camera={{ position: [5, 0, 5] }} shadows >
            <Suspense fallback={<Loader />}>
            {/* <Canvas className='w-screen h-sreen' camera={{ position: [-0.5, 1, 2] }} shadows > */}
                <ambientLight intensity={1.5}/>
                <directionalLight position={[5 , 0, 5]} intensity={2} castShadow />
                <SceneModel  modelPath={modelPath} />
                {/* <primitive
                object={gltf.scene}
                position={[0, 0, 0]}
                scale={[1, 1, 1]}
                children-0-castShadow
                /> */}
                <OrbitControls target={[0, 1, 0]}   minDistance={2} maxDistance={10} />
            {/* </Canvas> */}
            </Suspense>
        </Canvas>        
    );
};


export default SceneP;