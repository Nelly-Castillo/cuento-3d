import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBox({ onSearch }) {
    // Estado local para almacenar el texto que el usuario escribe en la caja de búsqueda.
    const [query, setQuery] = useState('');
     // Hook de React Router para navegar entre rutas
    const navigate = useNavigate();
    // Se ejecuta cuando el usuario envía el formulario (Enter o click)
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue.
        // quita espacios al inicio/fin
        const texto = query.trim();
        // onSearch(query);
        // Si el componente padre envió la función onSearch, se ejecuta
        if (onSearch) {
            onSearch(texto); // Enviamos la búsqueda al componente padre
        } else {
            console.error("Error: onSearch no fue pasada a SearchBox.");
        }
        // console.log("Buscando:", texto);
        // Después de buscar, manda al usuario a la página de libros
        navigate('/books');
    };

    return (
        // Formulario visual del buscador
        <form onSubmit={handleSubmit} className="flex items-center  rounded-full p-2 bg-[#FFF5E1]">
            {/* Input donde el usuario escribe su búsqueda */}
            <input
                type="text"
                placeholder="Buscar libro..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1 focus:outline-none w-64"
            />
            <button type="submit" className="bg-[#0D0630]  text-white rounded-full p-2 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
        </form>
    );
}

export default SearchBox;