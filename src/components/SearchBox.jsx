import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBox({ onSearch }) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate;

    const handleSubmit = (e) => {
        e.preventDefault();
        // onSearch(query);
        if (onSearch) {
        onSearch(query);
        } else {
        console.error("Error: onSearch no fue pasada a SearchBox.");
        }
        console.log("Buscando:", query);
        navigate('/books');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center  rounded-full p-2 bg-[#FFF5E1]">
            <input
                type="text"
                placeholder="Buscar libros..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1 focus:outline-none w-64"
            />
            <button type="submit" className="bg-[#CF8D00] text-white rounded-full p-2 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
        </form>
    );
}

export default SearchBox;