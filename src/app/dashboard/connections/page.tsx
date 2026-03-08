import { Building2, Calendar as CalendarIcon, FileText, Landmark, MessageSquare, Mic } from 'lucide-react';

export default function ConnectionsPage() {

    // Static mock data to perfectly match the Encuadrado MVP screenshot
    const connections = [
        {
            title: "Datos bancarios",
            status: "Conectado",
            statusColor: "bg-[#ecfdf5] text-[#069e73]",
            icon: <Landmark className="w-5 h-5 text-gray-700" />,
            description: "Todo lo que ganes a través de CasaSalud llegará a la cuenta que ingreses",
            action: "Editar",
            buttonType: "default"
        },
        {
            title: "Fonasa",
            status: "Conectado",
            statusColor: "bg-[#ecfdf5] text-[#069e73]",
            icon: <Building2 className="w-5 h-5 text-blue-500" />,
            description: "Ofrece sesiones 1:1 de manera individual con código de prestación Fonasa",
            action: "Editar",
            buttonType: "default"
        },
        {
            title: "Google Calendar",
            status: "Conectado",
            statusColor: "bg-[#ecfdf5] text-[#069e73]",
            icon: <CalendarIcon className="w-5 h-5 text-yellow-500" />,
            description: "Tus sesiones de CasaSalud están en tu calendario de Google",
            action: "Editar",
            buttonType: "default"
        },
        {
            title: "Transcriptor IA",
            status: "Conectado",
            statusColor: "bg-[#ecfdf5] text-[#069e73]",
            icon: <Mic className="w-5 h-5 text-purple-500" />,
            description: "Transcribe tus sesiones en la ficha del paciente automáticamente con IA",
            action: "Desconectar",
            buttonType: "default"
        },
        {
            title: "Servicio de Impuestos Internos",
            status: "B. Honorarios",
            statusColor: "bg-[#ecfdf5] text-[#069e73]",
            icon: <FileText className="w-5 h-5 text-red-600" />,
            description: "Envía boletas de forma automática apenas te paguen la sesión (DTE 39/73)",
            action: "Editar",
            buttonType: "default"
        },
        {
            title: "WhatsApp Business",
            status: "Plan Avanzado",
            statusColor: "bg-gray-800 text-white",
            icon: <MessageSquare className="w-5 h-5 text-green-500" />,
            description: "Responde mensajes de tus clientes y agenda automáticamente con el asistente IA",
            action: "Mejorar plan",
            buttonType: "outline"
        }
    ];

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">Conexiones</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {connections.map((conn, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-5">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                                        {conn.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-base">{conn.title}</h3>
                                </div>
                                <span className={`px-2.5 py-1 rounded-[4px] text-xs font-semibold tracking-wide ${conn.statusColor}`}>
                                    {conn.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                {conn.description}
                            </p>
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                            <button className="px-5 py-2 text-sm font-medium border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors w-full text-left">
                                {conn.action}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
