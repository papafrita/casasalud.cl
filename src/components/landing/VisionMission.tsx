import React from 'react';

export default function VisionMission() {
    return (
        <section className="vision-mission py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/header-bg.png')" }}>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="vision-card bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                        <div className="logo-center mb-6">
                            <h3 className="text-3xl font-bold text-gray-800">Visión</h3>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Ser una plataforma de salud integral virtual reconocida por articular ciencia, comunidad y cuidado del planeta. Aspiramos a transformar la forma en que entendemos la salud, integrando la evidencia científica con un enfoque humanista y ecosocial, para promover bienestar sostenible en las personas y sus comunidades.
                        </p>
                        <div className="flex justify-center">
                            <img src="/assets/images/logo.png" alt="Logo" className="w-24 h-24 rounded-full" />
                        </div>
                    </div>
                    <div className="mission-card bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                        <div className="logo-center mb-6">
                            <h3 className="text-3xl font-bold text-gray-800">Misión</h3>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Brindar atención médica y acompañamiento transdisciplinario online, centrado en la persona y su entorno. Nuestra misión es generar un espacio confiable, accesible y humano, donde la práctica clínica se combina con la educación, la prevención y los cuidados compartidos, favoreciendo decisiones informadas y vínculos de confianza entre el tratante y la persona.
                        </p>
                        <div className="flex justify-center">
                            <img src="/assets/images/logo.png" alt="Logo" className="w-24 h-24 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
