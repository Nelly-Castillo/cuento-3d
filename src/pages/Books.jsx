import CardBook from '../components/CardBook'
// Componente Books
// - filteredBooks: lista de cuentos filtrados (por búsqueda). Si no llega, usa arreglo vacío.
// - loading: indica si los datos aún se están cargando.
function Books({ filteredBooks = [], loading}) {
    //Mientras carga, mostrar animación de "loading"
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
    //Cuando ya cargaron los cuentos
    return (
        <div className="pt-20 flex items-center flex-wrap justify-center">
            {/* Si hay cuentos filtrados, mostrar cada tarjeta */}
            {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                    <CardBook key={book.id} bookData={book} />
                ))
                 // Si no encontramos ningún cuento, mostrar mensaje
            ) : (
                <p className="text-xl mt-10">❌ No se encontró ningún cuento.</p>
            )}
        </div>
    );
}

export default Books; 