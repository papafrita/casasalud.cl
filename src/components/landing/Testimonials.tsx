import React from 'react';

export default function Testimonials() {
    return (
        <section className="testimonials-section py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/header-bg.png')" }}>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
                    Lo que dicen nuestras pacientes
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="testimonial-card">
                        <div className="testimonial-avatar mb-4">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center">
                                <img src="/assets/images/testimonial1.svg" alt="Testimonial 1" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            "Me siento realmente satisfecha con la atención recibida.
                            El equipo es muy profesional y me han ayudado mucho en mi proceso de sanación."
                        </p>
                        <p className="font-semibold text-gray-800">Teresa Padilla</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-avatar mb-4">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center">
                                <img src="/assets/images/testimonial2.svg" alt="Testimonial 2" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            "La mejor decisión que he tomado para mi bienestar.
                            La atención integral me ha cambiado la vida completamente."
                        </p>
                        <p className="font-semibold text-gray-800">Angie M.</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-avatar mb-4">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center">
                                <img src="/assets/images/testimonial3.svg" alt="Testimonial 3" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            "Siempre es una gran motivación saber que tengo este apoyo.
                            El equipo me acompaña en cada paso de mi proceso."
                        </p>
                        <p className="font-semibold text-gray-800">Flavia Zúñiga</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
