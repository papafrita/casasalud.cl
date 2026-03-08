import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function BookingSection() {
    const providers = await prisma.profile.findMany({
        select: { slug: true, fullName: true, specialty: true }
    });
    return (
        <section className="booking-section py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/booking-bg.jpeg')" }}>
            <div className="container mx-auto px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Agenda tu sesión
                        </h2>
                        {providers.length > 0 ? (
                            <div className="flex flex-wrap gap-4 justify-center mb-10">
                                {providers.map((p) => (
                                    <Link key={p.slug} href={`/book/${p.slug}`}>
                                        <button className="booking-button">{p.fullName} - {p.specialty}</button>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <button className="booking-button mb-6">Reserva aquí</button>
                        )}
                        <div className="text-box bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
                            <div className="space-y-4 text-white">
                                <div>
                                    <h3 className="font-semibold text-lg">Ubicación</h3>
                                    <p>Online via virtual box, desde casa</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Horas</h3>
                                    <p>Flexible, según disponibilidad del profesional</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
