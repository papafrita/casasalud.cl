import React from 'react';

export default function PlatformInfo() {
    return (
        <section className="platform-section py-20 bg-no-repeat" style={{ backgroundColor: '#80A27F', backgroundImage: "url('/assets/images/logo.png')", backgroundSize: '384px 384px', backgroundPosition: '2rem center' }}>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                        <p className="text-lg text-white leading-relaxed">
                            Te invitamos a crear tu propio perfil para agendar y recomendarnos
                            en red. Buscamos a todo tipo de profesional o terapeuta que pueda
                            brindar servicios a distancia, consejería, evaluaciones o terapias.
                        </p>
                    </div>
                    <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                        <p className="text-lg text-white leading-relaxed">
                            Ofrecemos esta plataforma como una solución para agendar, recibir pagos y
                            tramitar boletas, además del servicio de recordatorio, ficha única electrónica con espacios para acuerdos compartidos en el plan terapéutico y marketing digital de los servicios con publicidad en redes sociales y asesoría gráfica.
                        </p>
                    </div>
                    <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
                        <p className="text-lg text-white leading-relaxed">
                            Piloto de un mes para profesionales entrevistados por Directorio. Luego comisión 10% del costo de atención.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
