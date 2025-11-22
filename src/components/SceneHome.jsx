import { useEffect, useRef, Suspense } from 'react'; 
import { Canvas, useLoader, useFrame } from '@react-three/fiber'; 
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import * as THREE from 'three'; 

const MODELO_FIJO = '/modelosP/home.glb';

function Loader() {
    const { progress } = useProgress();
    //En caso de que no funcione regresar a esta opcion
    // return <Html center>{progress.toFixed(0)} % loaded</Html>
    return (
            <Html center>
                <div className="text-white text-lg mb-2">
                        Cargando modelo: {progress.toFixed(0)}%
                </div>
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0D0630] animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#18314F] animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#384E77] animate-bounce [animation-delay:.7s]"></div>
                </div>
            </Html>
    )
}

function Model() {
    const { scene, animations } = useGLTF(MODELO_FIJO); 
    const group = useRef();
    const mixer = useRef();

    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene); 
            const action = mixer.current.clipAction(animations[0]); 
            action.play();
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

export default function SceneHome() {
    
useGLTF.preload(MODELO_FIJO);

    return (
        <Canvas className="w-1/2 h-full  " camera={{ position: [-0.5, 0, 60] }} shadows>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1 , 1, 1]} intensity={2} castShadow />
            <Suspense fallback={<Loader />}>
            <Model/> 
            </Suspense>
            <OrbitControls target={[0, 1, 0]} minDistance={2} maxDistance={10} />
        </Canvas>
    );
}