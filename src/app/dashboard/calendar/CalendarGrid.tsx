'use client';

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday } from 'date-fns';
import { Video, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import CalendarSidebar from './CalendarSidebar';

export default function CalendarGrid({ currentDate, refreshTrigger, onOpenAgenda }: { currentDate: Date, refreshTrigger: number, onOpenAgenda?: (d?: Date) => void }) {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAppointments() {
            setLoading(true);
            try {
                // Fetch appointments filtering roughly by month
                const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
                const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

                const res = await fetch(`/api/appointments?start=${start.toISOString()}&end=${end.toISOString()}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAppointments(data);
                }
            } catch (error) {
                console.error("Failed to load appointments", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAppointments();
    }, [refreshTrigger, currentDate]);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

    let displayAppointments = appointments;

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white text-gray-700 relative">
            <div className={`grid grid-cols-7 border-b border-gray-100 bg-white z-10 transition-all ${selectedAppointment ? 'mr-[350px]' : ''}`}>
                {weekDays.map((day) => (
                    <div key={day} className="py-2 text-center text-sm font-medium text-gray-600 capitalize">
                        {day}
                    </div>
                ))}
            </div>

            <div className={`flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto transition-all ${selectedAppointment ? 'mr-[350px]' : ''}`}>
                {days.map((day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const dayAppointments = displayAppointments.filter(app => format(new Date(app.startTime), 'yyyy-MM-dd') === dateStr);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isTodayDate = isToday(day);

                    return (
                        <div
                            key={day.toString()}
                            onClick={() => setSelectedAppointment({ isDayView: true, date: day, appointments: dayAppointments })}
                            className={`min-h-[140px] p-1 border-b border-r border-gray-100 relative cursor-pointer hover:bg-gray-50/50 transition-colors ${!isCurrentMonth ? 'bg-gray-50/30' : 'bg-white'}`}
                        >
                            <div className="flex justify-end mb-1 px-1">
                                <span className={`text-sm font-medium w-6 h-6 mt-0.5 flex items-center justify-center rounded-full ${isTodayDate ? 'bg-blue-600 text-white' : !isCurrentMonth ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {format(day, dateFormat)}
                                </span>
                            </div>

                            <div className="flex flex-col gap-[2px] overflow-y-auto max-h-[calc(100%-32px)] custom-scrollbar">
                                {loading ? null : dayAppointments.map((app) => {
                                    let bg = "bg-[#edfdf7]";
                                    let border = "border border-transparent";
                                    let text = "text-[#069e73]";

                                    if (app.status === 'PENDING_PAYMENT') {
                                        bg = "bg-[#edfdf7]";
                                        border = "border border-[#2563eb]"; // Blue outline for outlined
                                        text = "text-[#069e73]";
                                    } else if (app.status === 'CANCELLED' || app.status === 'NO_SHOW') {
                                        bg = "bg-red-50";
                                        border = "border border-transparent";
                                        text = "text-red-700";
                                    }

                                    return (
                                        <div
                                            key={app.id}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Don't trigger the day click
                                                setSelectedAppointment(app);
                                            }}
                                            className={`flex items-center gap-1.5 px-1 py-[2px] text-[11px] rounded-[3px] ${bg} ${border} ${text} cursor-pointer hover:brightness-95 truncate mt-0.5`}
                                        >
                                            <Video className="w-3 h-3 flex-shrink-0 ml-0.5" strokeWidth={2.5} />
                                            <span className="font-semibold tabular-nums">{format(new Date(app.startTime), 'HH:mm')}</span>
                                            <span className="truncate min-w-0 pr-1">
                                                {app._isPatientView 
                                                    ? (app.provider?.profiles?.[0]?.fullName || app.provider?.name || 'Doctor')
                                                    : (app.patient?.name || 'Paciente')}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <CalendarSidebar 
                selectedItem={selectedAppointment} 
                onClose={() => setSelectedAppointment(null)} 
                onOpenAgenda={onOpenAgenda} 
                onSelectAppointment={setSelectedAppointment}
            />

            {!selectedAppointment && (
                <div className="absolute bottom-6 right-6 z-20">
                    <button
                        onClick={() => { if (onOpenAgenda) onOpenAgenda(new Date()); }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        <Plus className="w-4 h-4" /> Agendar
                    </button>
                </div>
            )}
        </div>
    );
}
