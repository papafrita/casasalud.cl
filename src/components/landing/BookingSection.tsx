import React from 'react';
import { prisma } from '@/lib/prisma';
import HomeBookingWizard from './HomeBookingWizard';
import { getSession } from '@/lib/auth';

export default async function BookingSection() {
    const providers = await prisma.profile.findMany({
        select: { slug: true, fullName: true, specialty: true }
    });
    const session = await getSession();
    const isAuthenticated = !!session;

    return (
        <section id="booking-section" className="booking-section py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/booking-bg.jpeg')" }}>
            <div className="container mx-auto px-4 lg:px-24 xl:px-32">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
                            <HomeBookingWizard 
                                providers={providers} 
                                isAuthenticated={isAuthenticated}
                                initialUserEmail={session?.user?.email}
                                initialUserName={session?.user?.name}
                            />
                        </div>

                        <div className="mt-12 text-center text-white p-6 bg-black/30 backdrop-blur-sm rounded-xl max-w-2xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg text-green-300">Ubicación</h3>
                                    <p>Online y/o Presencial</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-green-300">Horarios</h3>
                                    <p>Sujetos a disponibilidad del especialista</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
