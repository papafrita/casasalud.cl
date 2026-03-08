import Link from 'next/link';
import { Calendar, LayoutDashboard, Users, UserRoundCog, Clock, DollarSign, Star, FileText, Store, LineChart, Plug } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#f9fafb]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">CasaSalud</h2>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">Platform</p>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Resumen</span>
                    </Link>
                    <Link href="/dashboard/calendar" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">Calendario</span>
                    </Link>
                    <Link href="/dashboard/services" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">Horarios-Servicios</span>
                    </Link>
                    <Link href="/dashboard/patients" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Pacientes</span>
                    </Link>
                    <Link href="/dashboard/finances" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-medium">Finanzas</span>
                    </Link>
                    <Link href="/dashboard/reviews" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <Star className="w-5 h-5" />
                        <span className="font-medium">Evaluaciones</span>
                    </Link>
                    <Link href="/dashboard/prescriptions" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Recetas médicas</span>
                    </Link>
                    <Link href="/dashboard/store" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <Store className="w-5 h-5" />
                        <span className="font-medium">Vitrina</span>
                    </Link>
                    <Link href="/dashboard/reports" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <LineChart className="w-5 h-5" />
                        <span className="font-medium">Reportes <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-bold uppercase">Nuevo</span></span>
                    </Link>
                    <Link href="/dashboard/connections" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-[#6366f1] transition-colors">
                        <Plug className="w-5 h-5" />
                        <span className="font-medium">Conexiones</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <UserRoundCog className="w-5 h-5" />
                        <span className="font-medium">Configuraciones</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-xl font-semibold text-gray-800">Panel de Control</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#6366f1] font-bold text-sm">
                            JP
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
