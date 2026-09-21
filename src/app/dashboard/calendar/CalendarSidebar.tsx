import { X, Mail, Phone, ExternalLink, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CalendarSidebar({
    selectedItem,
    onClose,
    onOpenAgenda,
    onSelectAppointment,
}: {
    selectedItem: any; // Appointment object with patient and service data, or null
    onClose: () => void;
    onOpenAgenda?: (d?: Date) => void;
    onSelectAppointment?: (app: any) => void;
}) {
    if (!selectedItem) return null;

    return (
        <div className="w-[350px] bg-white border-l border-gray-200 h-full flex flex-col shadow-sm transition-all absolute right-0 top-0 bottom-0 z-20">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                    {selectedItem.isDayView ? 'Detalles del día' : 'Detalles de atención'}
                </h2>
                <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {selectedItem.isDayView ? (
                <div className="flex-1 p-5 flex flex-col items-center overflow-y-auto">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2 mt-2 shrink-0">
                        <span className="text-2xl font-bold">{new Date(selectedItem.date).getDate()}</span>
                    </div>

                    {(!selectedItem.appointments || selectedItem.appointments.length === 0) ? (
                        <div className="text-center mb-6">
                            <h3 className="font-semibold text-gray-900 text-lg">No hay atenciones</h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-[200px] mx-auto">Selecciona este día para programar una nueva consulta o revisar tu disponibilidad.</p>
                        </div>
                    ) : (
                        <div className="text-center mb-6 w-full">
                            <h3 className="font-semibold text-gray-900 text-lg">{selectedItem.appointments.length} Atencion{selectedItem.appointments.length > 1 ? 'es' : ''}</h3>
                            <p className="text-sm text-gray-500 mt-1 capitalize">
                                {new Date(selectedItem.date).toLocaleDateString(['es-CL'], { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    )}

                    {selectedItem.appointments && selectedItem.appointments.length > 0 && (
                        <div className="w-full space-y-3 mb-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                            {selectedItem.appointments.map((app: any) => {
                                let statusColor = 'bg-gray-50';
                                if (app.status === 'CANCELLED' || app.status === 'NO_SHOW') statusColor = 'bg-red-50';
                                else if (app.status === 'CONFIRMED') statusColor = 'bg-green-50/50';

                                return (
                                    <div key={app.id} onClick={() => onSelectAppointment?.(app)} className={`${statusColor} hover:brightness-95 cursor-pointer border border-gray-200 rounded-lg p-3 flex justify-between items-center transition-all`}>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 text-sm truncate pr-2">{app.patient?.name || 'Paciente'}</p>
                                            <div className="flex items-center gap-3">
                                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                    <Clock className="w-3 h-3"/> {new Date(app.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                                <p className="text-[10px] uppercase font-bold text-gray-400 mt-1 truncate">{app.status}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <button
                        onClick={() => {
                            onClose();
                            if (onOpenAgenda) onOpenAgenda(selectedItem.date);
                        }}
                        className="mt-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm w-full shrink-0"
                    >
                        Agendar en este día
                    </button>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {/* Patient Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                {selectedItem.patient.name?.charAt(0) || "P"}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    {selectedItem.patient.name}
                                </h3>
                                <p className="text-sm text-gray-500">{selectedItem.patient.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium border border-gray-200 transition-colors">
                                <Mail className="w-4 h-4" /> Email
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium border border-green-200 transition-colors">
                                <Phone className="w-4 h-4" /> WhatsApp
                            </button>
                        </div>

                        <Link href={`/dashboard/patients/${selectedItem.patient.id}`} className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline mt-2">
                            Ver ficha paciente <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Appointment Details */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Servicio</h4>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="font-medium text-gray-800">{selectedItem.service?.name || "Atención General"}</p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                <span>{new Date(selectedItem.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span>-</span>
                                <span>{new Date(selectedItem.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </p>
                            <p className="text-sm text-gray-600 font-medium mt-2">Estado:
                                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${selectedItem.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {selectedItem.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Actions */}
                    <div className="space-y-2">
                        <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                            Reprogramar atención
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all">
                            Cancelar atención
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
