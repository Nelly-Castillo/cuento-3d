import { useEffect, useRef, Suspense } from 'react'; 
import { Canvas, useLoader, useFrame } from '@react-three/fiber'; 
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import * as THREE from 'three'; 

// Ruta del modelo GLB que se va a renderizar
const MODELO_FIJO = '/modelosP/home.glb';
// LOADER — Componente visual que aparece mientras el modelo 3D se carga
function Loader() {
     // useProgress provee el progreso (%) de carga del modelo
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

// MODEL — Se encarga de cargar el GLB, reproducir animaciones y renderizarlo
function Model() {
    // useGLTF carga el modelo 3D y sus animaciones
    const { scene, animations } = useGLTF(MODELO_FIJO); 
    // Referencias para manejar el modelo y su animación
    const group = useRef();
    const mixer = useRef();
    // Al cargar el modelo, si tiene animaciones, reproducimos la primera
    useEffect(() => {
        if (animations && animations.length > 0) {
            // Crea un mezclador para animaciones
            mixer.current = new THREE.AnimationMixer(scene); 
            // Selecciona y reproduce la primera animación del archivo GLB
            const action = mixer.current.clipAction(animations[0]); 
            action.play();
        }
    }, [scene, animations]);
    // Actualiza la animación en cada frame
    // delta = tiempo entre frames
    useFrame((_, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return (
        <primitive 
            ref={group} 
            object={scene}  // Carga el modelo real
            scale={1}  // Escala del modelo
            position={[0, -1, 0]}  // Ajuste para centrarlo en pantalla
            castShadow 
            receiveShadow 
        />
    );

}
// SCENEHOME — Contenedor principal con iluminación, controles y Canvas
export default function SceneHome() {
// Precarga el modelo antes de mostrar la escena (mejora el rendimiento)
useGLTF.preload(MODELO_FIJO);

    return (
        <Canvas className="w-1/2 h-full  " camera={{ position: [-0.5, 0, 60] }} shadows>
             {/* Luz ambiental que ilumina toda la escena suavemente */}
            <ambientLight intensity={0.5} />
             {/* Luz direccional (como el sol), produce sombras */}
            <directionalLight position={[1 , 1, 1]} intensity={2} castShadow />
            {/* Suspense evita errores mientras el modelo carga */}
            <Suspense fallback={<Loader />}>
                <Model/> 
            </Suspense>
            {/* OrbitControls permite rotar/zoom alrededor del modelo */}
            <OrbitControls target={[0, 1, 0]} minDistance={2} maxDistance={10} />
        </Canvas>
    );
}