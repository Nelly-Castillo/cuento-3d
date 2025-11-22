import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SceneP from '../components/SceneP';

export default function Story() {
    // Obtiene el ID del cuento desde la URL.
    const { id } = useParams(); 
    // Hook para navegar entre rutas.
    const navigate = useNavigate();
    // Guarda el cuento cargado desde el JSON.
    const [cuento, setCuento] = useState(null);  
    // Índice del párrafo actual.
    const [indiceInicio, setIndiceInicio] = useState(0);
    // Número de párrafos visibles al mismo tiempo.
    const parrafosPorPantalla = 2;
    // Modelo 3D correspondiente al párrafo.
    const [modelo3DActual, setModelo3DActual] = useState(null);

    // carga el cuento 
    useEffect(() => {
        fetch('/data/cuentos.json')
        .then(res => res.json())
        .then(data => {
            // Guarda el cuento completo en estado.
            setCuento(data);
        })
        .catch(err => console.error('Error al cargar el cuento:', err));
    }, [id]); // Se ejecuta cuando cambia el ID del cuento.

    //Actualiza el modelo por parrafo

    useEffect(() => {
        if (cuento && cuento.parrafos.length > 0) {
            const nuevoModelo = cuento.parrafos[indiceInicio]?.modelo3D;
            // Si el párrafo tiene modelo, lo carga.
            setModelo3DActual(nuevoModelo || null); 
        }
    }, [indiceInicio, cuento]);  // Se ejecuta al cambiar de párrafo o al cargar el cuento.

    //manejo de teclas 
    useEffect(() => {
    function manejarTeclas(e) {
        // Avanzar →  a los siguientes párrafos
        if (e.key === "ArrowRight") {
            if (indiceInicio + parrafosPorPantalla < cuento.parrafos.length) {
                setIndiceInicio(i =>
                    // Asegura que no pase del último párrafo
                    Math.min(cuento.parrafos.length - parrafosPorPantalla, i + parrafosPorPantalla)
                );
            }
        }

        // Regresar ← a los párrafos anteriores
        if (e.key === "ArrowLeft") {
            if (indiceInicio > 0) {
                setIndiceInicio(i => Math.max(0, i - parrafosPorPantalla));
            }
        }
    }

    window.addEventListener("keydown", manejarTeclas);
    // Limpia el evento al desmontar el componente
    return () => {
            window.removeEventListener("keydown", manejarTeclas);
        };
    }, [indiceInicio, cuento]); 
    
    // Pantalla de carga mientras se trae el JSON
    if (!cuento) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0D0630] animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#18314F] animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#384E77] animate-bounce [animation-delay:.7s]"></div>
                </div>
            </div>
        )
    }
    // Obtiene los párrafos visibles en la pantalla
    const parrafosActuales = cuento.parrafos.slice(
        indiceInicio,
        indiceInicio + parrafosPorPantalla
    ) || [];
    return (
        
        <div className="w-full h-screen relative">
            <div className="absolute  z-10 w-full h-full top-0 left-0 pointer-events-none " >
                {/* Renderiza el modelo 3D solo si existe */}
                {/* <SceneP modelPath={modelo3DActual} /> */}
                {modelo3DActual ? (
                    <SceneP modelPath={modelo3DActual} />
                ) : (
                    null
                )}
            </div>
            <div className='pt-24 px-10  absolute z-20 w-full h-full top-0 left-0 pointer-events-none'>
                <h1 className="text-3xl font-bold mb-4">{cuento.titulo}</h1>
                <div className='mx-3 w-full flex justify-between content-center'>
                    {/* Párrafos actuales, alineados uno a la izquierda y otro a la derecha */}
                    {parrafosActuales.map((p,i) => ( 
                        <div 
                            key={p.id} 
                            className={`w-2xs p-4 bg-[#FFF5E1]/50 rounded-xl backdrop-blur-sm    text-[#0D0630] ${i === 0 ? "text-left" : "text-right"}`}
                        >
                            <p>{p.texto}</p>
                        </div>
                    ))}
                </div>
                {/* Botones de navegación */}
                <div className="mx-3 w-full flex justify-between mt-6 pointer-events-auto">
                    {/* Botón ← retroceso */}
                    {indiceInicio > 0 && (
                        <button
                        onClick={() => setIndiceInicio(i => Math.max(0, i - parrafosPorPantalla))} disabled={indiceInicio === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#CF8D00" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                            </svg>
                        </button>
                    )}
                     {/* Botón → avanzar y botón REGRESAR al final */}
                    {indiceInicio + parrafosPorPantalla < cuento.parrafos.length ? (
                        <button
                        onClick={() => setIndiceInicio(i => Math.min(cuento.parrafos.length - parrafosPorPantalla, i + parrafosPorPantalla))} disabled={indiceInicio + parrafosPorPantalla >= cuento.parrafos.length}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#CF8D00" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                            </svg>
                        </button>
                    ) : (
                        // Si ya no hay más párrafos → muestra botón para volver al menú
                            <button
                                onClick={() => navigate('/books')}
                                className="px-6 py-3 bg-[#0D0630]  text-[#FFF5E1] rounded-full font-bold shadow-lg  hover:bg-[#32C5FE]  transition duration-300 mb-10"
                            >
                                Regresar 
                            </button>
                    )}
                </div>
            </div>
        </div>
    );
}
