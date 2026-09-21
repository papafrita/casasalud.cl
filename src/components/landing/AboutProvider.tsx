import React from 'react';
import { ProviderProfileData } from '@/data/providerProfiles';

interface AboutProviderProps {
    profileData: ProviderProfileData;
}

export default function AboutProvider({ profileData }: AboutProviderProps) {
    return (
        <section 
            className="about-provider py-20 bg-cover bg-center bg-no-repeat relative" 
            style={{ backgroundImage: profileData.bgImage || "url('/assets/images/header-bg.png')" }}
        >
            {profileData.personImage && (
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" 
                    style={{ backgroundImage: profileData.personImage, backgroundSize: 'auto 75vh', backgroundPosition: 'left 2rem center', opacity: 0.8 }}
                ></div>
            )}
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-center md:justify-end lg:justify-center">
                    <div className="max-w-2xl bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            {profileData.greeting}
                        </h2>
                        <div className="text-box">
                            {profileData.paragraphs.map((paragraph, index) => (
                                <p key={index} className="text-lg text-gray-700 mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
