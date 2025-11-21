// import { useEffect, useState } from 'react';
import CardBook from '../components/CardBook'


function Books({ filteredBooks = [], loading}) {
    if (loading) {
        return <p className="pt-20 text-center">Cargando libros...</p>;
    }
    
    return (
        <div className="pt-20 flex items-center flex-wrap justify-center">
            {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                    <CardBook key={book.id} bookData={book} />
                ))
            ) : (
                <p className="text-xl mt-10">❌ No se encontró ningún cuento.</p>
            )}
        </div>
    );
}

export default Books; 