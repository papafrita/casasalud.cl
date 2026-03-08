import { prisma } from '@/lib/prisma';
import MarkdownEditor from './MarkdownEditor';
import { notFound } from 'next/navigation';

export default async function PatientRecordPage({
    params,
}: {
    params: { id: string };
}) {
    const patient = await prisma.user.findUnique({
        where: { id: params.id },
        include: {
            profiles: true,
            patientAppointments: {
                include: { clinicalRecord: true },
                orderBy: { startTime: 'desc' }
            }
        }
    });

    if (!patient || patient.role !== 'PATIENT') {
        notFound();
    }

    // Hardcoded for MVP Phase 2
    const providerProfile = await prisma.profile.findUnique({
        where: { slug: 'dr-perez' }
    });

    if (!providerProfile) return <div>Provider not found</div>;

    // Law 19.628 - Audit Log trigger on read access
    await prisma.auditLog.create({
        data: {
            actorId: providerProfile.userId,
            action: 'READ_CLINICAL_RECORD',
            targetId: patient.id,
        }
    });

    const profile = patient.profiles[0];
    const lastAppointments = patient.patientAppointments.slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile?.fullName || patient.email}</h2>
                    <p className="text-gray-500">RUT: {profile?.sisId || 'No Registrado'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas Clínicas</h3>
                        {/* The Markdown editor is a client component for interaction */}
                        <MarkdownEditor
                            patientId={patient.id}
                            providerId={providerProfile.userId}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                            Últimas Atenciones
                        </h3>
                        <div className="space-y-4">
                            {lastAppointments.length === 0 ? (
                                <p className="text-sm text-gray-500">No hay atenciones previas.</p>
                            ) : (
                                lastAppointments.map((apt) => (
                                    <div key={apt.id} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                        <p className="text-sm font-medium text-gray-900">
                                            {apt.startTime.toLocaleDateString('es-CL', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Status: {apt.status}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
