import { BarChart3, TrendingUp, Users, CalendarDays, ExternalLink, ArrowUpRight, CheckCircle2, DollarSign } from 'lucide-react';

export default function ReportsPage() {
    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">Reportes</h2>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white shadow-sm flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        Últimos 30 días
                    </button>
                    <button className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Exportar PDF
                    </button>
                </div>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-blue-50 text-[#2563eb] rounded-xl">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +12%
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Nuevos pacientes</p>
                        <h3 className="text-3xl font-bold text-gray-900">42</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                            <CalendarDays className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +5%
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Sesiones agendadas</p>
                        <h3 className="text-3xl font-bold text-gray-900">128</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-green-50 text-emerald-600 rounded-xl">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                            Estable
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Tasa de asistencia</p>
                        <h3 className="text-3xl font-bold text-gray-900">94%</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +21%
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Ingresos generados</p>
                        <h3 className="text-3xl font-bold text-gray-900">$3.8M</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">

                {/* Visual Fake Chart for Appointments over time */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Consultas Creadas y Atendidas</h3>
                            <p className="text-sm text-gray-500 mt-1">Comparativa de agendamientos vs atenciones reales</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></div> Creadas</div>
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-200"></div> Atendidas</div>
                        </div>
                    </div>

                    {/* Fake CSS Chart */}
                    <div className="flex-1 mt-auto h-64 flex items-end justify-between gap-2 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none mb-6">
                            <div className="border-b border-gray-100 w-full h-0"></div>
                            <div className="border-b border-gray-100 w-full h-0"></div>
                            <div className="border-b border-gray-100 w-full h-0"></div>
                            <div className="border-b border-gray-100 w-full h-0"></div>
                        </div>

                        {/* Bars representing weeks/days */}
                        {[
                            { lab: 'Lun', c: 40, a: 35 },
                            { lab: 'Mar', c: 55, a: 52 },
                            { lab: 'Mié', c: 45, a: 45 },
                            { lab: 'Jue', c: 65, a: 60 },
                            { lab: 'Vie', c: 80, a: 78 },
                            { lab: 'Sáb', c: 30, a: 28 },
                            { lab: 'Dom', c: 15, a: 15 },
                        ].map((d, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 z-10 gap-2 h-full justify-end">
                                <div className="flex items-end justify-center w-full gap-1 h-56 relative group">
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-10 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        C: {d.c}% | A: {d.a}%
                                    </div>
                                    <div className="w-1/3 bg-[#2563eb] rounded-t-[3px] hover:opacity-80 transition-opacity" style={{ height: `${d.c}%` }}></div>
                                    <div className="w-1/3 bg-blue-200 rounded-t-[3px] hover:opacity-80 transition-opacity" style={{ height: `${d.a}%` }}></div>
                                </div>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{d.lab}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Patient Retention / Origin */}
                <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Tasa de Retención</h3>
                            <p className="text-sm text-gray-500 mb-4">Pacientes que vuelven a agendar</p>
                        </div>
                        <div className="flex items-end gap-3 mt-auto mb-2">
                            <span className="text-5xl font-bold text-[#2563eb] leading-none">68%</span>
                            <span className="text-sm text-gray-500 font-medium mb-1 border-b border-dashed border-gray-300 pb-0.5">Muy alto</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-1">
                        <h3 className="font-semibold text-gray-900 mb-6">Servicios más populares</h3>
                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-gray-700">Consulta Inicial Online</span>
                                    <span className="text-gray-500 font-semibold">45%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-[#2563eb] h-2 rounded-full shadow-sm" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-gray-700">Terapia Psicológica VPI</span>
                                    <span className="text-gray-500 font-semibold">30%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full shadow-sm" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-gray-700">Sesión de Seguimiento</span>
                                    <span className="text-gray-500 font-semibold">25%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-amber-500 h-2 rounded-full shadow-sm" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Premium CTA (Matching screenshot note) */}
            < div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6" >
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Métricas Premium de CasaSalud</h3>
                        <p className="text-gray-600 text-sm max-w-2xl">Obtén acceso a análisis avanzados, demografía de pacientes, métricas de éxito del tratamiento y predicciones financieras generadas por IA actualizando tu plan.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap px-6 py-2.5 bg-white border border-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
                    Mejorar a Premium
                </button>
            </div >
        </div >
    );
}
