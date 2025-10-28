import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Story() {
    const { id } = useParams(); 
    const [cuento, setCuento] = useState(null);  
    const [indiceInicio, setIndiceInicio] = useState(0);
    const parrafosPorPantalla = 2;

    useEffect(() => {
        fetch('/data/cuentos.json')
        .then(res => res.json())
        .then(data => {
            setCuento(data);
        })
        .catch(err => console.error('Error al cargar el cuento:', err));
    }, [id]);

    if (!cuento) return <p className="text-center mt-10">Cargando cuento...</p>;
    const parrafosActuales = cuento.parrafos.slice(
        indiceInicio,
        indiceInicio + parrafosPorPantalla
    );
    return (
        <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">{cuento.titulo}</h1>
        <div className='w-full flex justify-between content-center'>
            {parrafosActuales.map((p,i) => ( 
                <div 
                    key={p.id} 
                    className={`p-1 bg-black/50 rounded-xl backdrop-blur-sm    text-white ${i === 0 ? "text-left" : "text-right"}`}
                >
                    <p>{p.texto}</p>
                </div>
            ))}
        </div>
            <div className="flex justify-between w-full max-w-md mt-6">
                {indiceInicio > 0 && (
                    <button
                    onClick={() => setIndiceInicio(i => Math.max(0, i - parrafosPorPantalla))}
                    disabled={indiceInicio === 0}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#CF8D00" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                        </svg>
                    </button>
                )}
                {indiceInicio + parrafosPorPantalla < cuento.parrafos.length && (
                    <button
                    onClick={() => setIndiceInicio(i => Math.min(cuento.parrafos.length - parrafosPorPantalla, i + parrafosPorPantalla))}
                    disabled={indiceInicio + parrafosPorPantalla >= cuento.parrafos.length}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#CF8D00" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
