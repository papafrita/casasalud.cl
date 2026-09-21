import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AboutProvider from '@/components/landing/AboutProvider';
import ProviderQualifications from '@/components/landing/ProviderQualifications';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { providerProfiles } from '@/data/providerProfiles';

export default async function ProviderProfilePage({ params }: { params: { slug: string } }) {
    const provider = await prisma.profile.findUnique({
        where: { slug: params.slug }
    });

    if (!provider) {
        notFound();
    }

    const profileData = providerProfiles[params.slug];

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white py-12 border-b">
               <div className="container mx-auto px-6 relative">
                  <div className="absolute top-0 left-6">
                      <Link href="/" className="flex items-center text-gray-500 hover:text-green-600 transition-colors">
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          Volver al inicio
                      </Link>
                  </div>
                  <div className="max-w-3xl mx-auto text-center mt-8">
                      <UserCircle className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                      <h1 className="text-4xl font-bold text-gray-900">{provider.fullName}</h1>
                      <p className="text-xl text-green-600 font-medium mt-2">{provider.specialty}</p>
                      {provider.bio && <p className="text-gray-700 mt-6 text-lg leading-relaxed">{provider.bio}</p>}
                  </div>
               </div>
            </div>

            <div className="flex-grow">
                {profileData ? (
                    <>
                        <AboutProvider profileData={profileData} />
                        <ProviderQualifications profileData={profileData} />
                    </>
                ) : (
                    <div className="container mx-auto py-20 px-6 text-center text-gray-500">
                        <p className="text-lg">Más información detallada sobre este profesional estará disponible pronto.</p>
                    </div>
                )}
            </div>

            <div className="bg-green-50 py-12 border-t border-green-100">
               <div className="container mx-auto px-6 text-center">
                   <h3 className="text-2xl font-semibold text-gray-800 mb-4">¿Te gustaría agendar una consulta?</h3>
                   <Link href="/#booking-section" className="btn-primary inline-flex items-center text-lg px-8 py-3">
                       Agendar Hora
                   </Link>
               </div>
            </div>

            <Footer />
        </main>
    )
}
