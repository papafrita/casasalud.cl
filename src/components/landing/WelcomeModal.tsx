'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, CheckCircle } from 'lucide-react';

export default function WelcomeModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isWelcome = searchParams.get('welcome') === 'true';
        if (isWelcome) {
            setIsOpen(true);
            // Clean up the URL so it doesn't reappear on reload
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, '', newUrl);
        }
    }, [searchParams, router]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Bienvenido a CasaSalud!
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Tu cuenta ha sido creada exitosamente. Ya puedes elegir a tu especialista y agendar tu primera consulta.
                    </p>
                    
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="btn-primary w-full"
                    >
                        Comenzar
                    </button>
                </div>
            </div>
        </div>
    );
}
