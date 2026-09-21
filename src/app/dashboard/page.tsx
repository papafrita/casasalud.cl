import { requireProvider } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';
import { CalendarCheck, DollarSign, Clock, Users } from 'lucide-react';

export default async function DashboardPage() {
    await requireProvider();
    const providerProfile = await prisma.profile.findFirst({
        where: { user: { role: 'PROVIDER' } }
    });

    if (!providerProfile) return <div>Provider not found</div>;

    const today = new Date();

    const todayAppointments = await prisma.appointment.findMany({
        where: {
            providerId: providerProfile.userId,
            startTime: { gte: startOfDay(today) },
            endTime: { lte: endOfDay(today) }
        },
        include: {
            patient: { include: { profiles: true } }
        },
        orderBy: { startTime: 'asc' }
    });

    const confirmedCount = todayAppointments.filter(a => a.status === 'CONFIRMED' || a.status === 'COMPLETED').length;
    // Stub finance metric for MVP
    const revenueEst = confirmedCount * 35000;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Resumen del Día</h2>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Citas Hoy"
                    value={todayAppointments.length}
                    icon={<CalendarCheck className="w-5 h-5 text-indigo-600" />}
                />
                <MetricCard
                    title="Confirmadas"
                    value={confirmedCount}
                    icon={<Users className="w-5 h-5 text-emerald-600" />}
                />
                <MetricCard
                    title="Por Confirmar"
                    value={todayAppointments.length - confirmedCount}
                    icon={<Clock className="w-5 h-5 text-amber-600" />}
                />
                <MetricCard
                    title="Ingresos Est. (CLP)"
                    value={`$${revenueEst.toLocaleString('es-CL')}`}
                    icon={<DollarSign className="w-5 h-5 text-blue-600" />}
                />
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Agenda de Hoy</h3>
                <div className="divide-y divide-gray-100">
                    {todayAppointments.length === 0 ? (
                        <p className="text-gray-500 py-4 text-center">No hay citas agendadas para hoy.</p>
                    ) : (
                        todayAppointments.map((apt) => (
                            <div key={apt.id} className="py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-medium text-gray-900 w-16">
                                        {apt.startTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {apt.patient?.profiles[0]?.fullName || apt.patient?.email || 'Paciente Anónimo'}
                                        </p>
                                        <p className="text-xs text-gray-500">{apt.status}</p>
                                    </div>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                                    Ver Ficha
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        </div>
    );
}
