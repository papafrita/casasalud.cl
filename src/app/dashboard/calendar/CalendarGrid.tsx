'use client';

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Video, Building2 } from 'lucide-react';

// Mock schedule data matching the screenshot
const MOCK_APPOINTMENTS = [
    { id: 1, date: '2026-02-23', time: '22:00', patient: 'Katherine Olmos Segura', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 2, date: '2026-02-25', time: '13:00', patient: 'Pablino Paredes', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 3, date: '2026-02-25', time: '22:00', patient: 'Constanza Hola Carvallo', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 4, date: '2026-02-25', time: '22:30', patient: 'Maite Alfaro', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 5, date: '2026-02-26', time: '22:00', patient: 'Juan Urrutia', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 6, date: '2026-02-28', time: '10:30', patient: 'Fernanda Seoane Orellana', type: 'ONLINE', status: 'OUTLINED' },
    { id: 7, date: '2026-02-28', time: '11:00', patient: 'daniela ovalle', type: 'ONLINE', status: 'OUTLINED' },
    { id: 8, date: '2026-02-28', time: '11:30', patient: 'Susana romero delgado', type: 'ONLINE', status: 'OUTLINED' },
    { id: 9, date: '2026-02-28', time: '12:00', patient: 'Javiera Godoy', type: 'ONLINE', status: 'OUTLINED' },
    { id: 10, date: '2026-02-28', time: '12:30', patient: 'Daniela salazar', type: 'ONLINE', status: 'OUTLINED' },
    { id: 11, date: '2026-03-01', time: '10:00', patient: 'Catherine Cuevas navarrete', type: 'ONLINE', status: 'OUTLINED' },
    { id: 12, date: '2026-03-01', time: '10:30', patient: 'Tabita Cid', type: 'ONLINE', status: 'OUTLINED' },
    { id: 13, date: '2026-03-01', time: '11:00', patient: 'Yasna Valdebenito', type: 'ONLINE', status: 'OUTLINED' },
    { id: 14, date: '2026-03-01', time: '11:30', patient: 'Daniela Jorquera Varas', type: 'ONLINE', status: 'OUTLINED' },
    { id: 15, date: '2026-03-01', time: '12:00', patient: 'Daniela Fredes Muñoz', type: 'ONLINE', status: 'OUTLINED' },
    { id: 16, date: '2026-03-02', time: '21:00', patient: 'Camila Troncoso avello', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 17, date: '2026-03-02', time: '21:30', patient: 'LUIS PALOMINOS RON', type: 'ONLINE', status: 'OUTLINED' },
    { id: 18, date: '2026-03-02', time: '22:00', patient: 'Fernanda Seoane Orellana', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 19, date: '2026-03-02', time: '22:30', patient: 'Catherine Cuevas navarrete', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 20, date: '2026-03-03', time: '21:30', patient: 'Antonia Hodges Rubilar', type: 'ONLINE', status: 'OUTLINED' },
    { id: 21, date: '2026-03-03', time: '22:30', patient: 'Daniela Jorquera Varas', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 22, date: '2026-03-04', time: '13:00', patient: 'Francis Hernandez', type: 'ONLINE', status: 'OUTLINED' },
    { id: 23, date: '2026-03-04', time: '22:00', patient: 'Daniela Fredes Muñoz', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 24, date: '2026-03-05', time: '18:15', patient: 'JESSICA SARZOZA INOSTROZ', type: 'ONLINE', status: 'OUTLINED' },
    { id: 25, date: '2026-03-05', time: '21:00', patient: 'Carolina Cortés Castro', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 26, date: '2026-03-07', time: '09:30', patient: 'LUIS PALOMINOS RON', type: 'ONLINE', status: 'CONFIRMED' },
    { id: 27, date: '2026-03-07', time: '10:00', patient: 'Fernanda Coronado', type: 'ONLINE', status: 'OUTLINED' },
    { id: 28, date: '2026-03-07', time: '10:30', patient: 'Jessica aillapan Jaque', type: 'ONLINE', status: 'OUTLINED' },
    { id: 29, date: '2026-03-07', time: '11:00', patient: 'Evelyn Muñoz Ramos', type: 'ONLINE', status: 'OUTLINED' },
    { id: 30, date: '2026-03-07', time: '11:30', patient: 'Constanza Hola Carvallo', type: 'ONLINE', status: 'OUTLINED' },
    { id: 31, date: '2026-03-14', time: '09:30', patient: 'Catherine Cuevas navarrete', type: 'ONLINE', status: 'OUTLINED' },
    { id: 32, date: '2026-03-14', time: '10:00', patient: 'Tabita Cid', type: 'ONLINE', status: 'CANCELLED' },
    { id: 33, date: '2026-03-14', time: '10:30', patient: 'Fernanda Seoane Orellana', type: 'ONLINE', status: 'OUTLINED' },
    { id: 34, date: '2026-03-14', time: '11:00', patient: 'Yasna Valdebenito', type: 'ONLINE', status: 'CANCELLED' },
    { id: 35, date: '2026-03-14', time: '11:30', patient: 'Antonia Hodges Rubilar', type: 'ONLINE', status: 'CANCELLED' },
    { id: 36, date: '2026-03-21', time: '10:00', patient: 'Nadia Cáceres Morales', type: 'ONLINE', status: 'OUTLINED' },
    { id: 37, date: '2026-03-21', time: '11:00', patient: 'Jessica aillapan Jaque', type: 'ONLINE', status: 'CANCELLED' },
    { id: 38, date: '2026-03-21', time: '11:30', patient: 'Evelyn Muñoz Ramos', type: 'ONLINE', status: 'OUTLINED' },
];

export default function CalendarGrid() {
    const currentDate = new Date(2026, 2, 7); // March 7, 2026 as per screenshot "Hoy" is 7
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white text-gray-700">
            <div className="grid grid-cols-7 border-b border-gray-100 bg-white z-10">
                {weekDays.map((day) => (
                    <div key={day} className="py-2 text-center text-sm font-medium text-gray-600">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
                {days.map((day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const dayAppointments = MOCK_APPOINTMENTS.filter(app => app.date === dateStr);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isTodayDate = dateStr === '2026-03-07'; 

                    return (
                        <div
                            key={day.toString()}
                            className={`min-h-[140px] p-1 border-b border-r border-gray-100 relative ${!isCurrentMonth ? 'bg-gray-50/30' : 'bg-white'}`}
                        >
                            <div className="flex justify-end mb-1 px-1">
                                <span className={`text-sm font-medium w-6 h-6 mt-0.5 flex items-center justify-center rounded-full ${isTodayDate ? 'bg-blue-600 text-white' : !isCurrentMonth ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {format(day, dateFormat)}
                                </span>
                            </div>

                            <div className="flex flex-col gap-[2px] overflow-y-auto max-h-[calc(100%-32px)] custom-scrollbar">
                                {dayAppointments.map((app) => {
                                    let bg = "bg-[#edfdf7]";
                                    let border = "border border-transparent";
                                    let text = "text-[#069e73]";

                                    if (app.status === 'OUTLINED') {
                                        bg = "bg-[#edfdf7]";
                                        border = "border border-[#2563eb]"; // Blue outline
                                        text = "text-[#069e73]";
                                    } else if (app.status === 'CANCELLED') {
                                        bg = "bg-red-50";
                                        border = "border border-transparent";
                                        text = "text-red-700";
                                    }

                                    return (
                                        <div
                                            key={app.id}
                                            className={`flex items-center gap-1.5 px-1 py-[2px] text-[11px] rounded-[3px] ${bg} ${border} ${text} cursor-pointer hover:brightness-95 truncate`}
                                            title={`${app.time} ${app.patient}`}
                                        >
                                            <Video className="w-3 h-3 flex-shrink-0 ml-0.5" strokeWidth={2.5} />
                                            <span className="font-semibold tabular-nums">{app.time}</span>
                                            <span className="truncate min-w-0 pr-1">{app.patient}</span>
                                        </div>
                                    )
                                })}
                                {dayAppointments.length > 5 && (
                                    <div className="text-[11px] font-medium text-gray-500 pl-1 mt-1">
                                        2 eventos más
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
