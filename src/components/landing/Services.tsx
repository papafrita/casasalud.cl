import React from 'react';

export default function Services() {
    return (
        <section className="services-section py-20 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/assets/images/team-bg.jpeg')" }}>
            {/* Logo in top right corner */}
            <div className="absolute top-6 right-6 z-10">
                <img src="/assets/images/logo.png" alt="Logo" className="w-16 h-16 rounded-full" />
            </div>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* First Column */}
                    <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8">
                            Atenciones de equipo{' '}
                            <span className="highlight-text">multiprofesional</span>
                        </h2>
                        <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Ofrecemos acompañamiento con conocimiento científico, humanista y social actualizado, con una mirada curiosa y responsable que integre la espiritualidad y los saberes ancestrales.
                            </p>
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="space-y-6">
                        <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Creemos que el bienestar integral es un derecho humano.
                                Que lxs profesionales y terapeutas debemos validar a las personas, reconocer sus experiencias vitales y acompañarlas desde la confianza. Nos inspira reforzar el poder de autogestión del cuerpo y la salud, fortaleciendo lo que ya habita en cada persona.
                            </p>
                        </div>
                        <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Soñamos con caminar juntxs hacia el buen vivir, ese estado en el que
                                el cuerpo y la psique pueden fluir con confianza y plenitud.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
