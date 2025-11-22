import { useEffect, useRef, Suspense } from 'react'; 
import { useGLTF, useProgress, Html, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

//  Muestra una animación mientras el modelo 3D se carga.
function Loader() {
    const { progress } = useProgress()
    // console.log(progress)
    //En caso de que no funcione regresar a esta opcion
    // return <Html center>{progress.toFixed(0)} % loaded</Html>
    return  (
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
//Encargado de cargar un modelo GLTF y reproducir animaciones.
function SceneModel({ modelPath }) {
    // Si la ruta es inválida, no renderiza el componente
    if (!modelPath || typeof modelPath !== 'string' || modelPath.length === 0) {
        return null; 
    }
    // Carga del modelo GLTF
    const { scene, animations = [] } = useGLTF(modelPath);
    // Referencia al modelo
    const group = useRef();
    // Controlador de animaciones
    const mixer = useRef();

    useEffect(() => {
        // Si hay animaciones en el modelo, se inicializa el mixer
        if (scene && animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene); 
            // Primera animación del GLTF
            const action = mixer.current.clipAction(animations[0]); 
            action.play();
        }else {
         // No hay animación
        mixer.current = null; 
    }
    }, [scene, animations]);
     // Se ejecuta en cada frame
    useFrame((_, delta) => {
        // Actualiza animación
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

//Renderiza toda la escena 3D incluyendo luces, controles y el modelo
const SceneP = ({ modelPath }) => {
    // Validación de ruta
    if (!modelPath || typeof modelPath !== "string" || modelPath.trim() === "") {
        return null;
    }
    // if (!modelPath) return null;
    return (
        <Canvas className='w-screen h-screen' camera={{ position: [5, 0, 5] }} shadows  >
            <Suspense fallback={<Loader />}>
            {/* Luces de la escena */}
                <ambientLight intensity={1.5}/>
                <directionalLight position={[5 , 5, 5]} intensity={2} castShadow />
                {/* Modelo GLTF */}
                <SceneModel  modelPath={modelPath} />
                {/* Permite mover la cámara con el mouse */}
                <OrbitControls target={[0, 1, 0]}   minDistance={2} maxDistance={10} />
            </Suspense>
        </Canvas>        
    );
};


export default SceneP;