import React from 'react';
import { ProviderProfileData } from '@/data/providerProfiles';

interface ProviderQualificationsProps {
    profileData: ProviderProfileData;
}

export default function ProviderQualifications({ profileData }: ProviderQualificationsProps) {
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
                                {profileData.qualifications.map((qual, index) => (
                                    <li key={index}>{qual}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="qualifications-box bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                            {profileData.philosophy.map((text, index) => (
                                <p key={index} className="text-lg text-white leading-relaxed mb-4">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Second row: Service offering centered */}
                    <div className="flex justify-center">
                        <div className="service-offering backdrop-blur-sm text-white p-6 rounded-lg text-center max-w-md transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: 'rgba(128, 162, 127, 0.8)' }}>
                            <h4 className="text-xl font-bold mb-2">{profileData.service.name}</h4>
                            <p className="text-lg">{profileData.service.duration} - {profileData.service.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
