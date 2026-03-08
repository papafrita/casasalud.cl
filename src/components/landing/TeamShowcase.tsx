import React from 'react';

export default function TeamShowcase() {
    return (
        <section className="team-showcase py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/header-bg.png')" }}>
            <div className="container mx-auto px-6 text-center">
                <div className="logo-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">CasaSalud.cl</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="service-card">
                        <div className="service-image h-64 rounded-lg mb-4 overflow-hidden">
                            <img src="/assets/images/teamcard1.png" alt="Equipo Profesionales Salud" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Equipo Profesionales Salud</h3>
                    </div>
                    <div className="service-card">
                        <div className="service-image h-64 rounded-lg mb-4 overflow-hidden">
                            <img src="/assets/images/teamcard2.png" alt="Equipo Bienestar Social" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Equipo Bienestar Social</h3>
                    </div>
                    <div className="service-card">
                        <div className="service-image h-64 rounded-lg mb-4 overflow-hidden">
                            <img src="/assets/images/teamcard3.png" alt="Equipo Terapias Integrativas" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Equipo Terapias Integrativas</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
