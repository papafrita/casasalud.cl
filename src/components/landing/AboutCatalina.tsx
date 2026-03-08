import React from 'react';

export default function AboutCatalina() {
    return (
        <section className="about-catalina py-20 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/assets/images/header-bg.png')" }}>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/catalina-breastfeeding.png')", backgroundSize: 'auto 75vh', backgroundPosition: 'left 2rem center', opacity: 0.8 }}></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-center">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            ¡Hola! Soy Catalina San Juan Mondaca
                        </h2>
                        <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Médica general egresada de la Universidad de la Frontera y residente en Medicina Familiar Comunitaria en la Universidad Austral de Chile.
                            </p>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Llevo más de 8 años trabajando en atención primaria, medicina rural y urgencias. En todos esos contextos he cultivado una forma de atender que combina solidez clínica, sensibilidad y presencia. Escuchar, para mí, es estar disponible con todo lo que soy, con respeto y sin apuro.
                            </p>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Soy madre de Paz, feminista y sureña 🌱. Mi enfoque integra lo biológico, lo emocional, lo sociocultural y lo espiritual, entendiendo que la salud se vive en muchas capas. Acompaño procesos desde una medicina que puede ser concreta —como una receta o una pauta de manejo—, pero también una pausa, una pregunta, o una posibilidad de volver a habitarse.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                No realizo terapias complementarias online, pero sí puedo orientarte hacia caminos terapéuticos alternativos si eso es lo que estás buscando.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
