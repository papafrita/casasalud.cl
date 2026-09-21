import { requireProvider } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';
import EditServiceForm from './EditServiceForm';

export default async function ServicesPage() {
    await requireProvider();
    // Mock user fetching
    const user = await prisma.user.findFirst({ where: { role: 'PROVIDER' } });
    if (!user) return <div>No provider found.</div>;

    let services = await prisma.service.findMany({
        where: { providerId: user.id },
        orderBy: { name: 'asc' }
    });

    if (services.length === 0) {
        // Create mock services for the view if empty
        const s1 = await prisma.service.create({
            data: { providerId: user.id, name: 'Consulta Médica General', type: 'IN_PERSON', durationMin: 45, requiresBoleta: true, price: 35000, isPublic: true }
        });
        const s2 = await prisma.service.create({
            data: { providerId: user.id, name: 'Telemedicina', type: 'ONLINE', durationMin: 30, requiresBoleta: true, price: 25000, isPublic: true }
        });
        services = [s1, s2];
    }

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
                {services.map((service) => (
                    <EditServiceForm key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
}
