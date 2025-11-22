function Help() {
    return (
        <div className="pt-30 flex flex-col items-center justify-center">
            <div className=" text-white bg-[#CF8D00] m-1 p-4 px-3 rounded-full w-400 font-bold text-2xl">
                <h1 className="px-2">Preguntas frecuentes</h1>
            </div>
            <div className="m-5 p-3 bg-[#32C5FE]/20 rounded-2xl">
                <h1 className="font-medium text-xl text-[#0D0630] p-5 border-b-2">Guia de uso </h1>
                <div className="text-[#18314F] px-5">
                    <p> Sigue estos pasos para navegar la plataforma.</p>
                    <ul className="list-disc list-inside">
                        <li>Presionar el boton</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Help; 