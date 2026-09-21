'use client';

import { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import AgendaModal from './AgendaModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, subMonths, format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isAgendaOpen, setIsAgendaOpen] = useState(false);
    const [agendaDate, setAgendaDate] = useState<Date>(new Date());
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const handleToday = () => setCurrentDate(new Date());

    const handleAppointmentSaved = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={handleToday} className="px-3 py-1.5 text-sm font-medium border border-gray-200 shadow-sm rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Hoy
                    </button>
                    <div className="flex items-center gap-1">
                        <button onClick={handlePreviousMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600"><ChevronRight className="w-5 h-5" /></button>
                        <span className="text-gray-800 ml-2 font-medium capitalize">
                            {format(currentDate, 'MMMM yyyy', { locale: es })}
                        </span>
                    </div>
                </div>


            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative w-full h-full">
                {/* The heavy lifting Grid component, passing the current visual month */}
                <CalendarGrid
                    currentDate={currentDate}
                    refreshTrigger={refreshTrigger}
                    onOpenAgenda={(d) => { setAgendaDate(d || new Date()); setIsAgendaOpen(true); }}
                />

            </div>

            <AgendaModal
                isOpen={isAgendaOpen}
                initialDate={agendaDate}
                onClose={() => setIsAgendaOpen(false)}
                onSaved={handleAppointmentSaved}
            />
        </div>
    );
}
