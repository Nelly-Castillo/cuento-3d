function Help() {
    return (
        <div className="pt-30 flex flex-col items-center justify-center text-justify ">
            <div className=" text-white bg-[#CF8D00] m-1 p-4 px-3 rounded-full w-5/6 font-bold text-2xl">
                <h1 className="px-2">Preguntas frecuentes</h1>
            </div>
            <div className="flex flex-cols-2 gap-4 justify-center-safe">
                <div className="m-5 p-3 bg-[#32C5FE]/20 rounded-2xl w-1/3">
                    <h1 className="font-medium text-xl text-[#0D0630] pt-2 p-5  pb-2 border-b-2">Guia de uso </h1>
                    <div className="text-[#18314F] px-5 pt-2.5 pb-3">
                        <p> Sigue estos pasos para navegar la plataforma.</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Presionar el boton <strong>Iniciar lectura</strong> para obtener la lista de libros.</li>
                            <li>Selecciona el libro de tu preferenica.</li>
                            <li>Puedes empezar a leer el cuento y intactuar con los objectos por medio de:
                                <ul className="list-[circle] list-inside ml-4 mt-1 space-y-1">
                                    <li>Puedes mover la camara arrastrando el con clik sostenido.</li>
                                    <li>Puedes usar el scroll para acerca o alejar del modelo.</li>
                                    <li>Usa los botones para para avanzar en la historia.</li>
                                </ul>
                            </li>
                            <li>Al final del cuento encontraras un boton para regregar al listado de libros. </li>
                        </ul>
                    </div>
                </div>
                <div className="m-5 p-3 bg-[#32C5FE]/20 rounded-2xl w-1/3">
                    <h1 className="font-medium text-xl text-[#0D0630] p-5 pt-2  pb-2 border-b-2">¿Por qué los cuentos disponibles en la plataforma son de dominio público?</h1>
                    <div className="text-[#18314F] px-5 pt-2.5 pb-3 items-center">
                        <p>Utilizamos únicamente libros de dominio público para garantizar que cualquier persona pueda acceder a ellos de forma legal, gratuita y segura. Los cuentos seleccionados han pasado al dominio público porque sus derechos de autor han expirado, lo que permite adaptarlos libremente a formatos interactivos y 3D sin infringir leyes de propiedad intelectual. Gracias a esto, podemos ofrecer historias clásicas de manera moderna, accesible y educativa sin costo para los usuarios.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help; 