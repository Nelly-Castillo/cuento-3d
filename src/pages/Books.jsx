// import { useEffect, useState } from 'react';
import CardBook from '../components/CardBook'


function Books({ filteredBooks = [], loading}) {
    if (loading) {
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