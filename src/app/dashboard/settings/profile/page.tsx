import { prisma } from '@/lib/prisma';
import { ChevronUp } from 'lucide-react';

export default async function ProfileSettingsPage() {
    const user = await prisma.user.findFirst({
        where: { role: 'PROVIDER' },
        include: { profiles: true }
    });

    if (!user) return <div>No provider found.</div>;
    const profile = user.profiles[0];

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Información profesional</h3>
                    <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
                        Editar
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre profesional</label>
                            <input type="text" disabled defaultValue={profile?.fullName || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción de tu trabajo</label>
                            <textarea disabled rows={6} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 leading-relaxed resize-none" defaultValue={profile?.bio || `Hola, soy medica general, residente de Medicina Familiar Comunitaria. Atiendo desde una medicina clara, actualizada y especialmente humana.\n\nTrabajo hace más de ocho años en APS rural y urbana, salud mental y telemedicina. Mis pacientes suelen decir que conmigo se sienten acompañadas, escuchadas y en confianza.`} />
                        </div>

                        <div className="flex items-start gap-2 pt-2">
                            <input type="checkbox" defaultChecked disabled className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label className="text-sm font-medium text-gray-700">¿Quieres que se muestren las evaluaciones de tus pacientes?</label>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Profesión</label>
                            <input type="text" disabled defaultValue={profile?.specialty || 'Medicina'} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Especialidad</label>
                            <input type="text" disabled defaultValue="Médica residente Medicina Familiar Comunitaria" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subespecialidades</label>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-600">General</span>
                                <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-600">Familia</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono profesional (opcional)</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                                    🇨🇱 +56
                                </span>
                                <input type="text" disabled placeholder="Ingresa tu número profesional" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-50 border border-gray-200 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección de tu negocio</label>
                            <input type="text" disabled defaultValue="Valdivia, Chile" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 mb-2" />

                            <label className="block text-sm font-medium text-gray-700 mb-1.5 mt-4">Detalles dirección</label>
                            <input type="text" disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">Apariencia</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-gray-800 text-white">Plan Avanzado</span>
                    </div>
                    <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
                        <ChevronUp className="w-4 h-4" /> Mejorar plan
                    </button>
                </div>
            </div>
        </>
    );
}
