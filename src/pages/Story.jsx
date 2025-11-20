import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SceneP from '../components/SceneP';

export default function Story() {
    const { id } = useParams(); 
    const [cuento, setCuento] = useState(null);  
    const [indiceInicio, setIndiceInicio] = useState(0);
    const parrafosPorPantalla = 2;
    const [modelo3DActual, setModelo3DActual] = useState(null);

    useEffect(() => {
        fetch('/data/cuentos.json')
        .then(res => res.json())
        .then(data => {
            setCuento(data);
        })
        .catch(err => console.error('Error al cargar el cuento:', err));
    }, [id]);

    useEffect(() => {
        // Actualiza el modelo 3D cada vez que 'indiceInicio' o 'cuento' cambien.
        if (cuento && cuento.parrafos.length > 0) {
            // El modelo 3D debe coincidir con el primer párrafo visible
            const nuevoModelo = cuento.parrafos[indiceInicio]?.modelo3D;
            setModelo3DActual(nuevoModelo || null); // Establece el path, o null si no existe
        }
    }, [indiceInicio, cuento]);

    if (!cuento) return <p className="text-center mt-10">Cargando cuento...</p>;

    // const modeloActual = cuento?.parrafos?.[indiceInicio]?.modelo3D || '/modelosP/jardCuento.glb';
    
    const parrafosActuales = cuento.parrafos.slice(
        indiceInicio,
        indiceInicio + parrafosPorPantalla
    ) || [];
    return (
        
        <div className="w-full h-screen relative">
            <div className="absolute  z-10 w-full h-full top-0 left-0 pointer-events-none " >
                <SceneP modelPath={modelo3DActual} />
            </div>
            <div className='p-4  absolute z-20 w-full h-full top-0 left-0 pointer-events-none'>
                {/* <h1 className="text-3xl font-bold mb-4">{cuento.titulo}</h1> */}
                <div className='w-full flex justify-between content-center'>
                    {parrafosActuales.map((p,i) => ( 
                        <div 
                            key={p.id} 
                            className={`w-2xs p-4 bg-[#0D0630]/50 rounded-xl backdrop-blur-sm    text-white ${i === 0 ? "text-left" : "text-right"}`}
                        >
                            <p>{p.texto}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-between mt-6 pointer-events-auto">
                    {indiceInicio > 0 && (
                        <button
                        onClick={() => setIndiceInicio(i => Math.max(0, i - parrafosPorPantalla))} disabled={indiceInicio === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#CF8D00" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                            </svg>
                        </button>
                    )}
                    {indiceInicio + parrafosPorPantalla < cuento.parrafos.length && (
                        <button
                        onClick={() => setIndiceInicio(i => Math.min(cuento.parrafos.length - parrafosPorPantalla, i + parrafosPorPantalla))} disabled={indiceInicio + parrafosPorPantalla >= cuento.parrafos.length}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#CF8D00" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
