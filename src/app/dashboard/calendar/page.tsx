import CalendarGrid from './CalendarGrid';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarPage() {
    return (
        <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <button className="px-3 py-1.5 text-sm font-medium border border-gray-200 shadow-sm rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Hoy
                    </button>
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-600"><ChevronLeft className="w-5 h-5" /></button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-600"><ChevronRight className="w-5 h-5" /></button>
                        <span className="text-gray-800 ml-2 font-medium">marzo de 2026</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer hover:bg-gray-50">
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-700">Mes</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 rotate-90 ml-1" />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-700">Mostrar</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 rotate-90 ml-1" />
                    </div>

                    <button className="text-blue-600 font-medium text-sm hover:underline px-2 flex items-center gap-2">
                        Copiar mi link
                    </button>

                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                        {/* Placeholder for user avatar in screenshot */}
                        <img src="https://i.pravatar.cc/150?img=33" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative w-full h-full">
                {/* The heavy lifting Grid component */}
                <CalendarGrid />

                {/* Floating Action Button "Agendar" equivalent from screenshot */}
                <div className="absolute bottom-6 right-6 z-20">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg">
                        <Plus className="w-4 h-4" /> Agendar
                    </button>
                </div>
            </div>
        </div>
    );
}
