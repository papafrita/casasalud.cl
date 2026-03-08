import { prisma } from '@/lib/prisma';
import { createService, deleteService } from '@/actions/services';
import { Clock, DollarSign, Globe2, Link as LinkIcon, MoreHorizontal, Plus, Video, Building2, ChevronDown, ChevronRight, MessageSquare, MapPin } from 'lucide-react';

export default async function ServicesPage() {
    // Mock user fetching
    const user = await prisma.user.findFirst({ where: { role: 'PROVIDER' } });
    if (!user) return <div>No provider found.</div>;

    const services = await prisma.service.findMany({
        where: { providerId: user.id },
        orderBy: { name: 'asc' }
    });

    // Provide some nice mock services if DB is empty
    const displayServices = services.length > 0 ? services : [
        { id: '1', name: 'Consulta Médica General', type: 'IN_PERSON', durationMin: 45, requiresBoleta: true, price: 35000, isPublic: true },
        { id: '2', name: 'Telemedicina', type: 'ONLINE', durationMin: 30, requiresBoleta: true, price: 25000, isPublic: true },
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">Servicios y Horarios</h2>
                    <p className="text-gray-500 text-sm mt-1">Configura tus disponibilidades y formatos de atención.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Nuevo Servicio
                </button>
            </div>

            <div className="space-y-4">
                {displayServices.map((service, index) => {
                    const isExpanded = index === 0; // We expand the first one to show the mock UI

                    return (
                        <div key={service.id} className={`bg-white rounded-2xl border transition-all ${isExpanded ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-gray-200 shadow-sm hover:border-gray-300'}`}>
                            {/* Service Header / Collapsed View */}
                            <div className="p-6 flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${service.type === 'ONLINE' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                        {service.type === 'ONLINE' ? <Video className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                                            {!service.isPublic && <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold">Privado</span>}
                                        </div>
                                        <div className="flex items-center justify-between gap-4 mt-1 text-sm text-gray-500 font-medium">
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {service.durationMin} min</span>
                                            <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> ${service.price.toLocaleString('es-CL')}</span>
                                            <span className="flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5" /> {service.type === 'ONLINE' ? 'Videollamada' : 'Presencial'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="p-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
                                        <LinkIcon className="w-4 h-4" /> Copiar Link
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                                        {isExpanded ? <ChevronDown className="w-5 h-5 text-blue-600" /> : <ChevronRight className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Configurator View */}
                            {isExpanded && (
                                <div className="border-t border-blue-100 bg-blue-50/10 px-6 py-6 space-y-4">

                                    {/* Sub-accordion 1: Información General */}
                                    <div className="bg-white border text-left border-gray-200 rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <FileTextIcon className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Información General</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">Nombre, foto, descripción, requisitos</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>

                                    {/* Sub-accordion 2: Horarios */}
                                    <div className="bg-white border text-left border-gray-200 rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <CalendarIcon className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Horarios</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">Bloques disponibles, excepciones, duraciones</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>

                                    {/* Sub-accordion 3: Ubicación y Cobranza */}
                                    <div className="bg-white border text-left border-gray-200 rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Ubicación y Cobranza</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">Sala física, link meeting, precios y pagos automáticos</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>

                                    {/* Sub-accordion 4: Comunicaciones */}
                                    <div className="bg-white border text-left border-gray-200 rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Comunicaciones</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">Recordatorios WhatsApp, correos, cancelaciones</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>

                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function FileTextIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
    )
}

function CalendarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}
