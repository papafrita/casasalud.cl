'use client';

import { useState, useEffect } from 'react';
import { fetchSlotsAction, authenticatedCheckoutAction, fetchProviderServicesAction } from '@/actions/booking';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import { Calendar, Clock, Loader2, CheckCircle2, Stethoscope } from 'lucide-react';
import { Slot } from '@/lib/availability';
import { toZonedTime } from 'date-fns-tz';

import { useRouter } from 'next/navigation';

const TIMEZONE = 'America/Santiago';

type Service = {
    id: string;
    name: string;
    durationMin: number;
    price: number;
    type: string;
};

export default function BookingWrapper({ slug, isAuthenticated }: { slug: string, isAuthenticated: boolean }) {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [isLoadingServices, setIsLoadingServices] = useState(true);

    const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()));
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isLocking, setIsLocking] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function loadServices() {
            try {
                const fetchedServices = await fetchProviderServicesAction(slug);
                setServices(fetchedServices);
                if (fetchedServices.length > 0) {
                    setSelectedServiceId(fetchedServices[0].id);
                }
            } catch (err) {
                console.error('Failed to load services', err);
            } finally {
                setIsLoadingServices(false);
            }
        }
        loadServices();
    }, [slug]);

    useEffect(() => {
        async function loadSlots() {
            if (!selectedServiceId) return;
            setIsLoadingSlots(true);
            setSlots([]);
            setSelectedSlot(null);
            try {
                const dateStr = format(selectedDate, 'yyyy-MM-dd');
                const fetchedSlots = await fetchSlotsAction(slug, dateStr, selectedServiceId);
                setSlots(fetchedSlots);
            } catch (err) {
                console.error('Failed to load slots', err);
            } finally {
                setIsLoadingSlots(false);
            }
        }

        loadSlots();
    }, [selectedDate, slug, selectedServiceId]);

    const handleDateChange = (days: number) => {
        const newDate = addDays(selectedDate, days);
        if (!isBefore(newDate, startOfDay(new Date()))) {
            setSelectedDate(newDate);
        }
    };

    const handleBooking = async () => {
        if (!selectedSlot || !selectedServiceId) return;
        if (!isAuthenticated) {
            router.push(`/login`);
            return;
        }

        setIsLocking(true);
        try {
            const result = await authenticatedCheckoutAction(slug, selectedSlot, selectedServiceId);
            if (result.success) {
                setIsConfirmed(true);
            } else {
                alert(result.error || 'Hubo un error al intentar reservar.');
                // reload slots
                const fetchedSlots = await fetchSlotsAction(slug, format(selectedDate, 'yyyy-MM-dd'), selectedServiceId);
                setSlots(fetchedSlots);
                setSelectedSlot(null);
            }
        } catch {
            alert('Hubo un error al intentar reservar.');
        } finally {
            setIsLocking(false);
        }
    };

    if (isConfirmed) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#6366f1]" />
                <h2 className="text-xl font-medium text-gray-900">¡Hora Reservada!</h2>
                <p className="text-gray-500 max-w-sm">
                    Tu hora de atención ha sido separada temporalmente. En la Fase 3, aquí se integrará la pasarela de pagos de Flow.cl.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-8">
            {/* Services Section */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2 text-gray-900 font-medium pb-2 border-b border-gray-100">
                    <Stethoscope className="w-5 h-5 text-[#6366f1]" />
                    <span>Selecciona el servicio</span>
                </div>
                {isLoadingServices ? (
                    <div className="flex items-center justify-center py-4 text-[#6366f1]">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map(service => (
                            <button
                                key={service.id}
                                onClick={() => setSelectedServiceId(service.id)}
                                className={`flex flex-col p-4 border rounded-xl text-left transition-all ${selectedServiceId === service.id
                                    ? 'border-[#6366f1] bg-[#6366f1]/5 shadow-sm ring-1 ring-[#6366f1]'
                                    : 'border-gray-200 hover:border-[#6366f1] hover:shadow-sm'
                                    }`}
                            >
                                <span className="font-semibold text-gray-900">{service.name}</span>
                                <span className="text-sm text-gray-500 mt-1">{service.durationMin} min • ${service.price.toLocaleString('es-CL')}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-sm">El profesional no tiene servicios configurados.</div>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Mini Calendar / Date Picker Section */}
                <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium pb-2 border-b border-gray-100">
                        <Calendar className="w-5 h-5 text-[#6366f1]" />
                        <span>Elige una fecha</span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <button
                            onClick={() => handleDateChange(-1)}
                            disabled={isBefore(addDays(selectedDate, -1), startOfDay(new Date()))}
                            className="text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            &larr;
                        </button>
                        <span className="font-medium text-gray-800">
                            {format(selectedDate, 'dd/MM/yyyy')}
                        </span>
                        <button
                            onClick={() => handleDateChange(1)}
                            className="text-gray-400 hover:text-gray-900"
                        >
                            &rarr;
                        </button>
                    </div>
                </div>

                {/* Slots Section */}
                <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium pb-2 border-b border-gray-100">
                        <Clock className="w-5 h-5 text-[#6366f1]" />
                        <span>Selecciona la hora</span>
                    </div>

                    <div className="min-h-[200px] relative">
                        {isLoadingSlots ? (
                            <div className="absolute inset-0 flex items-center justify-center text-[#6366f1]">
                                <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                        ) : slots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                                {slots.map((slot, idx) => {
                                    const zonedTime = toZonedTime(new Date(slot.startTime), TIMEZONE);
                                    const timeString = format(zonedTime, 'HH:mm');
                                    const isSelected = selectedSlot === slot.startTime;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedSlot(slot.startTime)}
                                            className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${isSelected
                                                ? 'bg-[#6366f1] text-white border-[#6366f1]'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-[#6366f1] hover:text-[#6366f1]'
                                                }`}
                                        >
                                            {timeString}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                                {selectedServiceId ? "Sin disponibilidad este día." : "Selecciona un servicio primero."}
                            </div>
                        )}
                    </div>

                    {selectedSlot && (
                        <button
                            onClick={handleBooking}
                            disabled={isLocking || !selectedServiceId}
                            className="btn-primary w-full mt-4"
                        >
                            {isLocking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {isAuthenticated ? "Confirmar Reserva" : "Inicia sesión para reservar"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

