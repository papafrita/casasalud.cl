import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Search, FileText, ChevronDown, Calendar, MessageCircle, MoreHorizontal, Mail, Download, Ticket } from 'lucide-react';

export default async function PatientsCRMPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || '';

    // Hardcoded for MVP Phase 2.
    const providerProfile = await prisma.profile.findUnique({
        where: { slug: 'dr-perez' }
    });

    if (!providerProfile) return <div>Provider not found</div>;

    // Find all unique patient IDs that have booked with this provider
    const patientIds = await prisma.appointment.findMany({
        where: { providerId: providerProfile.userId },
        select: { patientId: true },
        distinct: ['patientId']
    });

    const ids = patientIds.map(p => p.patientId);

    // Search logic
    const patients = await prisma.user.findMany({
        where: {
            id: { in: ids },
            profiles: {
                some: {
                    OR: [
                        { fullName: { contains: query, mode: 'insensitive' } },
                        { sisId: { contains: query, mode: 'insensitive' } }
                    ]
                }
            }
        },
        include: {
            profiles: true,
            patientAppointments: {
                where: { providerId: providerProfile.userId },
                orderBy: { startTime: 'desc' },
                take: 1
            }
        }
    });

    // We can manually add some mock patients if DB is empty to show the UI
    const mockDisplayPatients = patients.length > 0 ? [] : [
        { id: '1', name: 'Alejandra Andrea Jaramillo Vallejos', lastSession: '21 feb 2024', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '2', name: 'Alejandra Hernandez', lastSession: '27 mar 2024', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '3', name: 'Alejandra Soto Bratz', lastSession: '', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '4', name: 'Alfonso Fuentes', lastSession: '', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '5', name: 'Andrea Carrillo', lastSession: '01 jul 2024', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '6', name: 'Andrés Canales Van Der Walk', lastSession: '', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '7', name: 'Angel Delgado', lastSession: '13 sep 2025', nextSession: '', payments: 'Al día', totalToCollect: '' },
        { id: '8', name: 'Angela Quezada', lastSession: '10 dic 2025', nextSession: '', payments: 'Al día', totalToCollect: '' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">Pacientes</h2>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-transparent">
                <button className="px-4 py-1.5 text-sm font-medium bg-gray-100/80 text-gray-800 rounded-full">Todos (264)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Activos (264)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Inactivos (0)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Eliminados</button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
                <form className="relative flex-1 max-w-2xl">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Buscar por nombre, RUT, teléfono o correo"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                </form>

                <div className="flex items-center gap-2">
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><Ticket className="w-4 h-4" /></button>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><Mail className="w-4 h-4" /></button>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><Download className="w-4 h-4" /></button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4" /> Interesados
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4" /> Plantillas
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Ticket className="w-4 h-4" /> Añadir <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-[#fcfdfd]">
                        <tr>
                            <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500">
                                <div className="flex items-center gap-1 cursor-pointer">Nombre <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 w-40">
                                <div className="flex items-center justify-center gap-1 cursor-pointer">Última sesión <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 w-40">
                                <div className="flex items-center justify-center gap-1 cursor-pointer">Próxima sesión <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 w-32">
                                <div className="flex items-center justify-center gap-1 cursor-pointer">Pagos <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 w-40">
                                <div className="flex items-center justify-center gap-1 cursor-pointer">Total por cobrar <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 w-32">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 custom-scrollbar max-h-[500px] overflow-y-auto">
                        {mockDisplayPatients.length > 0 ? (
                            mockDisplayPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                        {patient.lastSession}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                        {patient.nextSession}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {patient.payments === 'Al día' && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#ecfdf5] text-[#059669]">
                                                Al día
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                                        {patient.totalToCollect}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-4 text-blue-600">
                                            <button className="hover:text-blue-700 transition-colors"><Calendar className="w-4 h-4" /></button>
                                            <button className="hover:text-blue-700 transition-colors"><MessageCircle className="w-4 h-4" /></button>
                                            <button className="hover:text-blue-700 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            patients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                                        {query ? 'No se encontraron pacientes' : 'Aún no hay pacientes registrados.'}
                                    </td>
                                </tr>
                            ) : (
                                patients.map((patient) => {
                                    const profile = patient.profiles[0];
                                    const lastAppt = patient.patientAppointments[0];
                                    return (
                                        <tr key={patient.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{profile?.fullName || patient.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                {lastAppt ? lastAppt.startTime.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                {/* No next session calculated yet */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#ecfdf5] text-[#059669]">
                                                    Al día
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-4 text-blue-600">
                                                    <button className="hover:text-blue-700 transition-colors"><Calendar className="w-4 h-4" /></button>
                                                    <button className="hover:text-blue-700 transition-colors"><MessageCircle className="w-4 h-4" /></button>
                                                    <button className="hover:text-blue-700 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
