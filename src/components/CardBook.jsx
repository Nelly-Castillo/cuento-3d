import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function CardBook (){
    const navigate = useNavigate();
    const [cuento, setCuento] = useState(null);

        useEffect(() => {
        fetch('/data/cuentos.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo cargar cuento.json. ¿Está la ruta bien?');
            }
            return res.json();
        })
        .then(data => {
            setCuento(data); 
        })
        .catch(error => {
            console.error("Error al cargar el cuento:", error.message);
        });
    }, []);

    if (!cuento) return <p>Cargando...</p>;
    const handleClick = () => {
        navigate(`/story/${cuento.id}`);
    };
    return (
        <div 
            onClick={handleClick}
            className="flex flex-col items-center p-3.5 rounded-xl m-1 hover:bg-[#FFF5E1] hover:text-[#CF8D00]">
            <h1 className="pb-1">{cuento.titulo}</h1>
            <img 
                src="../public/image/pPatitoFeo.png" 
                alt="portada del libro" 
                className="
                    w-34
                    h-54
                    rounded-xl
                "
            />
            <p className="pt-1">{cuento.autor}</p>
        </div>
    );
}
export default CardBook;