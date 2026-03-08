import React from 'react';

export default function JoinTeam() {
    return (
        <section className="join-team-section py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundColor: '#80A27F', backgroundImage: "url('/assets/images/contact-bg.png')" }}>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                            Contacta con nosotros para unirte al equipo.
                        </h2>
                    </div>
                    <div className="flex-1 text-white">
                        <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Dirección</h3>
                                    <p>Pucón - Valdivia, Chile</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Teléfono</h3>
                                    <p>+569 8784 0539</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Correo</h3>
                                    <p>catalinasanjuanm@hotmail.com</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Redes sociales</h3>
                                    <div className="flex gap-4 mt-2">
                                        <a href="https://instagram.com/casasalud.cl" target="_blank" rel="noreferrer" className="flex w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-green-100 transition-colors">
                                            <i className="fa-brands fa-instagram text-green-600"></i>
                                        </a>
                                        <a href="https://facebook.com/casasalud.cl" target="_blank" rel="noreferrer" className="flex w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-green-100 transition-colors">
                                            <i className="fa-brands fa-facebook text-green-600"></i>
                                        </a>
                                        <a href="https://twitter.com/casasalud.cl" target="_blank" rel="noreferrer" className="flex w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-green-100 transition-colors">
                                            <i className="fa-brands fa-twitter text-green-600"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
