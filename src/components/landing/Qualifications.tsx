import React from 'react';

export default function Qualifications() {
    return (
        <section className="qualifications-section py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/about-bg - copia.jpg')" }}>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <div className="space-y-12">
                    {/* First row: Two qualification boxes side by side */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="qualifications-box bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Formación que respalda mi práctica
                            </h3>
                            <ul className="space-y-3 text-white">
                                <li>• Diplomada en Salud Familiar (U. de Chile)</li>
                                <li>• Diplomada en Geriatría y Gerontología Social (UFRO)</li>
                                <li>• Certificada en Fitoterapia con mención en personas mayores (PUC)</li>
                                <li>• Formación en Género y Feminismos (U. de Chile)</li>
                                <li>• Iniciación en Reiki Nivel I</li>
                            </ul>
                        </div>
                        <div className="qualifications-box bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                            <p className="text-lg text-white leading-relaxed mb-4">
                                Además de mi formación académica, llevo más de 15 años practicando
                                yoga, meditación y otras terapias complementarias que han enriquecido
                                mi mirada sobre la salud, integrando saberes naturales, simbólicos y
                                ancestrales.
                            </p>
                            <p className="text-lg text-white leading-relaxed mb-4">
                                Me interesa que cada persona pueda encontrar un espacio donde cuidarse
                                de forma autónoma, con dignidad y en sintonía con su historia 💜
                            </p>
                            <p className="text-lg text-white leading-relaxed mb-4">
                                Puedes conocer más de mi mirada en @dra.sanjuan
                            </p>
                            <p className="text-lg text-white leading-relaxed mb-4">
                                Nos vemos cuando lo necesites.
                            </p>
                            <p className="text-lg text-white leading-relaxed">
                                Aquí hay medicina con raíz y con alma.
                            </p>
                        </div>
                    </div>

                    {/* Second row: Service offering centered */}
                    <div className="flex justify-center">
                        <a href="#" className="service-offering backdrop-blur-sm text-white p-6 rounded-lg text-center max-w-md cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: 'rgba(128, 162, 127, 0.8)' }}>
                            <h4 className="text-xl font-bold mb-2">Consulta médica integral online</h4>
                            <p className="text-lg">30 minutos - $5.000</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
